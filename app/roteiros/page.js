"use client";

import {useState, useEffect, useMemo} from "react";
import CardRoteiro from "../../components/CardRoteiro";
import { roteiros, categorias } from "../../data/roteiros";

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const inicial = { q: "", categoria: "", mod: "", ordem: "recentes" };

const parseData = (dataStr) => {
  if(!dataStr){
    return new Date(0);
  }
  const [dia, mes, ano] = dataStr.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

export default function Roteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const[f, setF] = useState(inicial);
  
  useEffect(() => {
    async function carregarDados(){
      try{
        setCarregando(true);
        const resposta = await fetch("/data/roteiros.json");
        if(!resposta.ok){
          throw new Error("Falha ao carregar dados");
        }
        const dados = await resposta.json();
        setRoteiros(dados);
      }catch(err){
        console.error(err);
        setErro("Não foi possivel carregar os roteiros");
      }finally{
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);
  const set = (campo) => (e) => setF({...f, [campo]: e.target.value});


  const itens = useMemo(() => {
    const q = norm(f.q.trim());
    const hoje = new Date();
    return roteiros.filter((r) => {
      const atendeTexto = !q || norm (`${r.titulo} ${r.descricao}`).includes(q);
      const atendeCat = !f.categoria || r.cat === f.categoria;
      let atendeMod = true;
      if(f.mod){
        const dataItem = parseData(r.dataModificacao);
        const diferencaDias = (hoje - dataItem) / (1000*60*60*24);
        atendeMod = diferencaDias >= 0 && diferencaDias <= Number(f.mod);
    }
    return atendeTexto && atendeCat && atendeMod;
  }) 
  
  .sort((a, b) => {
    if (f.ordem === "titulo") return a.nome.localeCompare(b.nome, "pt-BR");
    if (f.ordem === "dataModificacao") return parseData(a.dataModificacao) - parseData(b.dataModificacao);
    if (f.ordem === "dataModificacao") return parseData(b.dataModificacao) - parseData(a.dataModificacao);
    return b.id - a.id;
    });   
  }, [f, roteiros]);

  return (
    <main>
      <section className="busca-area fundo-verde">
        <h1>Roteiros disponíveis</h1>
        <form className="filtros" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="campo busca">
            <label htmlFor="q">Pesquisar</label>
            <input id="q" type="search" placeholder="Digite o nome ou Autor" value={f.q} onChange={set("q")} />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" value={f.categoria} onChange={set("categoria")}>
              <option value="Todas">Todas</option>
              <option value="Artes">Artes</option>
              <option value="Ciencia">Ciência</option>
              <option value="Educacao Fisica">Educação Física</option>
              <option value="Geografia">Geografia</option>
              <option value="Historia">História</option>
              <option value="Lingua Inglesa">Língua Inglesa</option>
              <option value="Lingua Portuguesa">Língua Portuguesa</option>
              <option value="Matematica">Matemática</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="ordem">Ordenar por</label>
            <select id="ordem" value={f.ordem} onChange={set("ordem")}>
              <option value="recentes">Mais recentes</option>
              <option value="recentes">Mais antigos</option>
              <option value="nome">Nome (A–Z)</option>
            </select>
          </div>
          <button type="button" className="btn" onClick={() => setF(inicial)}>Limpar filtros</button>
        </form>
      </section>

      <section className="lista" aria-live="polite">
        <p className="contagem">
          {itens.length} {itens.length === 1 ? "roteiro encontrado" : "roteiros encontrados"}
        </p>
        <div className="grade">
          {itens.length
            ? itens.map((r) => <CardRoteiro key={r.id} roteiro={r} />)
            : <p className="vazio" style={{ gridColumn: "1 / -1" }}>
                Nenhum roteiro encontrado. Tente outro termo ou limpe os filtros.
              </p>}
        </div>
      </section>
    </main>
  );
}

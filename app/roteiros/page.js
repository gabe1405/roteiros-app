"use client";

import { useState, useMemo } from "react";
import CardRoteiro from "../../components/CardRoteiro";
import { roteiros } from "../../data/roteiros";

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const inicial = { q: "", categoria: "", mod: "", ordem: "recentes" };

const parseData = (dataStr) => {
  if (!dataStr) return new Date(0);
  const [dia, mes, ano] = dataStr.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
};

export default function Roteiros() {
  const [f, setF] = useState(inicial);

  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value });

  const itens = useMemo(() => {
    const q = norm(f.q.trim());
    const hoje = new Date();

    return roteiros
      .filter((r) => {
        const atendeTexto = !q || norm(`${r.titulo} ${r.descricao}`).includes(q);
        const atendeCat = !f.categoria || r.categoria === f.categoria;
        let atendeMod = true;
        if (f.mod) {
          const dataItem = parseData(r.dataModificacao);
          const diferencaDias = (hoje - dataItem) / (1000 * 60 * 60 * 24);
          atendeMod = diferencaDias >= 0 && diferencaDias <= Number(f.mod);
        }
        return atendeTexto && atendeCat && atendeMod;
      })
      .sort((a, b) => {
        if (f.ordem === "titulo") return a.titulo.localeCompare(b.titulo, "pt-BR");
        if (f.ordem === "antigos") return parseData(a.dataModificacao) - parseData(b.dataModificacao);
        return parseData(b.dataModificacao) - parseData(a.dataModificacao); // recentes
      });
  }, [f]);

  return (
    <main>
      <section className="busca-area fundo-verde">
        <h1>Roteiros disponíveis</h1>
        <form className="filtros" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="campo busca">
            <label htmlFor="q">Pesquisar</label>
            <input id="q" type="search" placeholder="Digite o título ou a descrição" value={f.q} onChange={set("q")} />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" value={f.categoria} onChange={set("categoria")}>
              <option value="">Todas</option>
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
              <option value="antigos">Mais antigos</option>
              <option value="titulo">Título (A–Z)</option>
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
          {itens.length ? (
            itens.map((r) => <CardRoteiro key={r.id} roteiro={r} />)
          ) : (
            <p className="vazio" style={{ gridColumn: "1 / -1" }}>
              Nenhum roteiro encontrado. Tente outro termo ou limpe os filtros.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import CardRoteiro from "../../components/CardRoteiro";
import { roteiros, categorias } from "../../data/roteiros";

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const inicial = { q: "", categoria: "", duracao: "", ordem: "recentes" };

export default function Roteiros() {
  const [f, setF] = useState(inicial);
  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value });

  const itens = useMemo(() => {
    const q = norm(f.q.trim());
    const [min, max] = f.duracao ? f.duracao.split("-").map(Number) : [0, 999];
    return roteiros
      .filter((r) =>
        (!q || norm(`${r.nome} ${r.desc}`).includes(q)) &&
        (!f.categoria || r.cat === f.categoria) &&
        r.dias >= min && r.dias <= max)
      .sort((a, b) =>
        f.ordem === "nome" ? a.nome.localeCompare(b.nome, "pt-BR")
        : f.ordem === "duracao" ? a.dias - b.dias
        : b.id - a.id);
  }, [f]);

  return (
    <main>
      <section className="busca-area fundo-verde">
        <h1>Roteiros disponíveis</h1>
        <form className="filtros" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="campo busca">
            <label htmlFor="q">Pesquisar</label>
            <input id="q" type="search" placeholder="Digite o nome ou destino" value={f.q} onChange={set("q")} />
          </div>
          <div className="campo">
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" value={f.categoria} onChange={set("categoria")}>
              <option value="">Todas</option>
              {categorias.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="ordem">Ordenar por</label>
            <select id="ordem" value={f.ordem} onChange={set("ordem")}>
              <option value="recentes">Mais recentes</option>
              <option value="nome">Nome (A–Z)</option>
              <option value="duracao">Menor duração</option>
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

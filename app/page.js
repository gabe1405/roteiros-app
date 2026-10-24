import Destaques from "../components/Destaques";
import Data from "../components/Data";

const atualizacoes = [
  "Roteiro 1 Adicionado",
  "Roteiro 2 Atualizado",
  "Roteiro 3 Adicionado",
  "Roteiro 4 Adicionado",
  "Roteiro 5 Adicionado",
  "Roteiro 6 Atualizado",
];

export default function Home() {
  return (
    <main>
      <Destaques />
      <section className="atualizacoes" aria-labelledby="t-atualizacoes">
        <h2 id="t-atualizacoes">Últimas atualizações</h2>
        <div className="grade">
          {atualizacoes.map((titulo) => (
            <article className="card" key={titulo}>
              <h3>{titulo}</h3>
              <Data valor="2026-10-24"/>
              <div className="autor">
                <div className="avatar" />            
                <div><strong>Title</strong><span>Description</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

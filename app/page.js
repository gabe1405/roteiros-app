import Destaques from "../components/Destaques";
import Data from "../components/Data";
import { roteiros } from "../data/roteiros";

const atualizacoes = [...roteiros]
  .sort((a, b) => (b.dataModificacao ?? "").localeCompare(a.dataModificacao ?? ""))
  .slice(0, 6);

export default function Home() {
  return (
    <main>
      <Destaques />
      <section className="atualizacoes" aria-labelledby="t-atualizacoes">
        <h2 id="t-atualizacoes">Últimas atualizações</h2>
        <div className="grade">
          {atualizacoes.map((roteiro) => (
            <article className="card" key={roteiro.id}>
              <h3>{roteiro.titulo}</h3>
              <div className="autor">
                <div className="avatar" />
                <div>
                  <strong><Data valor={roteiro.dataModificacao} /></strong>
                  <span>{roteiro.descricao}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

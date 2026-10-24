import Data from "../components/Data";
import Destaques from "../components/Destaques";
import CardRoteiro from "../components/CardRoteiro";
import { roteiros_mod } from "../lib/roteiros";

const atualizacoes = roteiros_mod()
  .sort((a, b) => (b.dataModificacao ?? "").localeCompare(a.dataModificacao ?? ""))
  .slice(0, 6);

export default function Home() {
  return (
    <main>
      <Destaques />
      <section className="atualizacoes" aria-labelledby="t-atualizacoes">
        <h2 id="t-atualizacoes">Últimas atualizações</h2>
        <div className="grade">
          {atualizacoes.map((r) => (
            <CardRoteiro key={r.id} roteiro={r} />
          ))}
        </div>
      </section>
    </main>
  );
}
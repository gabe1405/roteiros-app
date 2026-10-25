import Data from "./Data";
import Link from "next/link";

export default function CardRoteiro({ roteiro }) {
  return (
    <article className="card">
      <h3>
        <Link href={`/roteiros/${roteiro.id}`}>{roteiro.titulo}</Link>
      </h3>
      <p className="autor">Autor: {roteiro.autor}</p>
      <p>{roteiro.descricao}</p>
      <div className="tags">
        <span className="tag">{roteiro.categoria}</span>
        <span className="tag"><Data valor={roteiro.dataModificacao} /></span>
      </div>
    </article>
  );
}
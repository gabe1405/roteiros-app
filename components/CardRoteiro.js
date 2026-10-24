import Data from "./Data";

export default function CardRoteiro({ roteiro }) {
  return (
    <article className="card">
      <h3>{roteiro.titulo}</h3>
      <p>{roteiro.descricao}</p>
      <div className="tags">
        <span className="tag">{roteiro.categoria}</span>
        <span className="tag"><Data valor={roteiro.dataModificacao} /></span>
        <span className="tag">Autor: {roteiro.autor}</span>
      </div>
    </article>
  );
}
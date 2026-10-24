export default function CardRoteiro({ roteiro }) {
  return (
    <article className="card">
      <h3>{roteiro.nome}</h3>
      <p>{roteiro.desc}</p>
      <div className="tags">
        <span className="tag">{roteiro.cat}</span>
        <span className="tag">{roteiro.dias} {roteiro.dias === 1 ? "dia" : "dias"}</span>
      </div>
    </article>
  );
}

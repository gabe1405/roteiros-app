import { notFound } from "next/navigation";
import roteiros from "../../../data/roteiros.json";
import Data from "../../../components/Data";
import Wiki from "../../../components/Wiki";

export const dynamicParams = false;   // ids fora da lista dão 404

export function generateStaticParams() {
  return roteiros.map((r) => ({ id: String(r.id) }));
}

export default async function DetalheRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((r) => String(r.id) === id);
  if (!roteiro) notFound();

  return (
    <main className="lista">
      <h1>{roteiro.titulo}</h1>
      <p><Data valor={roteiro.dataModificacao} /></p>
      <p style={{ whiteSpace: "pre-line" }}>{roteiro.conteudo}</p>
      <SaibaMais tema={roteiro.titulo} />
    </main>
  );
}
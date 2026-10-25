import { notFound } from "next/navigation";
import roteiros from "../../../data/roteiros.json";
import Data from "../../../components/Data";
import Wiki from "../../../components/Wiki";
import usuarios from "../../../data/usuarios.json";

export const dynamicParams = false; // ids fora da lista dão 404

// Textos de teste, um por id de roteiro
const conteudos = {
  "r1": `Escreva aqui o texto do roteiro r1.`,

  "r2": `Objetivo: compreender as funções seno, cosseno e tangente e saber representá-las no gráfico.

Etapa 1 - Revisão de trigonometria
Triângulo retângulo, razões trigonométricas e a circunferência trigonométrica. Conversão entre graus e radianos.

Etapa 2 - Função seno e cosseno
Domínio, imagem, período e amplitude. Como o gráfico muda quando alteramos os coeficientes.

Etapa 3 - Função tangente
Assíntotas verticais, período e comportamento do gráfico.

Etapa 4 - Equações trigonométricas
Resolver equações simples no intervalo de 0 a 2π e identificar todas as soluções.

Exercício: esboçar o gráfico de f(x) = 2·sen(x) + 1 e indicar período e imagem.

Dica: desenhe a circunferência trigonométrica toda vez que resolver um exercício.`,

  "r3": `Escreva aqui o texto do roteiro r3.`,
};

export function generateStaticParams() {
  return roteiros.map((r) => ({ id: String(r.id) }));
}

export default async function DetalheRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((r) => String(r.id) === id);
  if (!roteiro) notFound();
  const autor = usuarios.find((u) => u.id === roteiro.autorId);

  const texto = conteudos[roteiro.id] ?? "Conteúdo deste roteiro ainda não foi cadastrado.";

return (
  <main>
    <section className="busca-area fundo-verde">
      <h1>{roteiro.titulo}</h1>
      <p>
  <Data valor={roteiro.dataModificacao} /> · Autor: {autor?.nome ?? "desconhecido"}
</p>
    </section>

    <section className="lista">
      <p style={{ whiteSpace: "pre-line" }}>{texto}</p>
      <Wiki tema={"Trigonometria"} />
    </section>
  </main>
);
}
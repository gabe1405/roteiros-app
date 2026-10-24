"use client";

import { useState } from "react";

export default function Destaques() {
  const [atual, setAtual] = useState(0);

  return (
    <section className="destaques fundo-verde" aria-labelledby="t-destaques">
      <h1 id="t-destaques">Destaques</h1>
      <div className="slide" role="img" aria-label={`Imagem de destaque ${atual + 1} de 4`}>
        <div className="formas">
          <span className="tri" /><span className="est" /><span className="qua" />
        </div>
      </div>
      <div className="pontos" role="group" aria-label="Slides">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={atual === i}
            onClick={() => setAtual(i)}
          />
        ))}
      </div>
    </section>
  );
}

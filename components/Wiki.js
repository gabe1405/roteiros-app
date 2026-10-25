"use client";

import { useEffect, useState } from "react";

export default function Wiki({ titulo }) {
  const [estado, setEstado] = useState({ status: "carregando" });

  useEffect(() => {
    const ctrl = new AbortController();
    setEstado({ status: "carregando" });

    fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`,
      { signal: ctrl.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "naoencontrado" : "falha");
        return r.json();
      })
      .then((d) => setEstado({ status: "sucesso", dados: d }))
      .catch((e) => {
        if (e.name !== "AbortError") setEstado({ status: "erro", motivo: e.message });
      });

    return () => ctrl.abort();
  }, [titulo]);

  if (estado.status === "carregando") {
    return <p>Carregando resumo do tema…</p>;
  }

  if (estado.status === "erro") {
    return (
      <p className="erro" role="alert">
        {estado.motivo === "naoencontrado"
          ? "Não encontramos um artigo sobre este tema."
          : "Não foi possível carregar o resumo agora. O roteiro continua disponível."}
      </p>
    );
  }

  const { title, extract, content_urls } = estado.dados;
  return (
    <section className="saiba-mais" aria-labelledby="t-saiba-mais">
      <h2 id="t-saiba-mais">Saiba mais: {title}</h2>
      <p>{extract}</p>
      <a href={content_urls.desktop.page} target="_blank" rel="noopener noreferrer">
        Ler o artigo completo na Wikipédia
      </a>
    </section>
  );
}
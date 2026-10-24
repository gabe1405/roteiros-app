"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    const dados = new FormData(e.currentTarget);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: dados.get("usuario"), senha: dados.get("senha") }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh(); // atualiza o cabeçalho com o usuário logado
    } else {
      const { erro } = await res.json();
      setErro(erro || "Não foi possível entrar.");
      setEnviando(false);
    }
  }

  return (
    <main className="login fundo-verde">
      <h1>Acessar sua conta</h1>
      <form className="form" onSubmit={entrar}>
        <label htmlFor="usuario">Usuário</label>
        <input id="usuario" name="usuario" type="text" autoComplete="username" required />
        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" autoComplete="current-password" required />
        <a className="esqueci" href="#">Esqueci minha senha</a>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <button type="submit" disabled={enviando}>{enviando ? "Entrando..." : "Entrar"}</button>
      </form>
    </main>
  );
}

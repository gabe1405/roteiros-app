"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

export default function Login() {
  const { entrar } = useAuth();
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function enviar(e) {
    e.preventDefault();

    if (!usuario.trim() || !senha) {
      setErro("Preencha usuário e senha.");
      return;
    }
    if (entrar(usuario, senha)) {
      router.push("/");
    } else {
      setErro("Usuário ou senha inválidos.");
    }
  }

  return (
    <main className="login fundo-verde">
      <h1>Acessar sua conta</h1>
      <form className="form" onSubmit={enviar} noValidate>
        <label htmlFor="usuario">Usuário</label>
        <input id="usuario" type="text" autoComplete="username"
               value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <label htmlFor="senha">Senha</label>
        <input id="senha" type="password" autoComplete="current-password"
               value={senha} onChange={(e) => setSenha(e.target.value)} />
        <a className="esqueci" href="#">Esqueci minha senha</a>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
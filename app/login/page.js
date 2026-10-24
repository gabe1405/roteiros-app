"use client";

import { useActionState } from "react";
import { entrar } from "../actions";

export default function Login() {
  const [estado, acao, pendente] = useActionState(entrar, null);

  return (
    <main className="login fundo-verde">
      <h1>Acessar sua conta</h1>
      <form className="form" action={acao}>
        <label htmlFor="usuario">Usuário</label>
        <input id="usuario" name="usuario" type="text" autoComplete="username"
               defaultValue={estado?.usuario ?? ""} required />
        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" autoComplete="current-password" required />
        <a className="esqueci" href="#">Esqueci minha senha</a>
        {estado?.erro && <p className="erro" role="alert">{estado.erro}</p>}
        <button type="submit" disabled={pendente}>{pendente ? "Entrando..." : "Entrar"}</button>
      </form>
    </main>
  );
}
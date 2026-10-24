"use client";

export default function Login() {
  function entrar(e) {
    e.preventDefault();
    // Ligue aqui a sua autenticação (API, NextAuth, etc.)
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
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

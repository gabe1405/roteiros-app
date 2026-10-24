import { cookies } from "next/headers";
import usuarios from "../data/usuarios.json";

export const COOKIE = "sessao";

// Retorna o usuário logado (sem a senha) ou null
export async function usuarioAtual() {
  const id = (await cookies()).get(COOKIE)?.value;
  const u = usuarios.find((x) => x.id === id);
  return u ? { id: u.id, nome: u.nome, email: u.email } : null;
}

// Procura por nome OU email, e confere a senha
export function buscarUsuario(login, senha) {
  const l = String(login || "").trim().toLowerCase();
  return usuarios.find(
    (u) => (u.nome.toLowerCase() === l || u.email.toLowerCase() === l) && u.senha === senha
  );
}
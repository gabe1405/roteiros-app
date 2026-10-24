"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, buscarUsuario, criarToken } from "../lib/sessao";

export async function entrar(estado, formData) {
  const usuario = formData.get("usuario");
  const u = buscarUsuario(usuario, formData.get("senha"));

  if (!u) {
    // devolve o erro (e o usuário digitado) para a página mostrar
    return { erro: "Usuário ou senha inválidos.", usuario };
  }

  (await cookies()).set(COOKIE, criarToken(u.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}

export async function sair() {
  (await cookies()).delete(COOKIE);
  redirect("/");
}
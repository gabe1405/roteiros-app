"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, buscarUsuario} from "../lib/sessao";

export async function entrar(estado, formData) {
  const usuario = formData.get("usuario");
  const u = buscarUsuario(usuario, formData.get("senha"));

  if (!u) {
    return { erro: "Usuário ou senha inválidos.", usuario };
  }

  (await cookies()).set(COOKIE, u.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/");
}

export async function sair() {
  (await cookies()).delete(COOKIE);
  redirect("/");
}
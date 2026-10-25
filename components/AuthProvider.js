"use client";
import { createContext, useContext, useEffect, useState } from "react";
import usuarios from "../data/usuarios.json";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("sessao");
    const u = usuarios.find((x) => x.id === id);
    if (u) setUsuario({ id: u.id, nome: u.nome, email: u.email });
  }, []);

  function entrar(login, senha) {
    const l = login.trim().toLowerCase();
    const u = usuarios.find(
      (x) => (x.nome.toLowerCase() === l || x.email.toLowerCase() === l) && x.senha === senha
    );
    if (!u) return false;
    localStorage.setItem("sessao", u.id);
    setUsuario({ id: u.id, nome: u.nome, email: u.email });
    return true;
  }

  function sair() {
    localStorage.removeItem("sessao");
    setUsuario(null);
  }

  return <AuthContext.Provider value={{ usuario, entrar, sair }}>{children}</AuthContext.Provider>;
}
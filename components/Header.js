"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sair } from "../app/actions";             // <- novo

export default function Header({ usuario }) {
  const path = usePathname();
  const ativo = (href) => (path === href ? "ativo" : undefined);

  return (
    <header className="topo">
      <Link className="logo" href="/" aria-label="Início">&#10070;</Link>
      <nav className="menu" aria-label="Principal">
        <Link href="/" className={ativo("/")}>Página inicial</Link>
        <Link href="/roteiros" className={ativo("/roteiros")}>Roteiros</Link>
        <Link href="#" className="espaco">Ajuda</Link>
        {usuario ? (
          <>
            <span className="ola">Olá, {usuario.nome}</span>
            <form action={sair}>
              <button type="submit" className="btn">Sair</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="btn">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

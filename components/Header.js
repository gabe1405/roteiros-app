"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ usuario }) {
  const path = usePathname();
  const router = useRouter();
  const ativo = (href) => (path === href ? "ativo" : undefined);

  async function sair() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="topo">
      <Link className="logo" href="/" aria-label="Início">&#10070;</Link>
      <nav className="menu" aria-label="Principal">
        <Link href="/" className={ativo("/")}>Página inicial</Link>
        <Link href="/roteiros" className={ativo("/roteiros")}>Roteiros</Link>
        <Link href="#" className="espaco">Ajuda</Link>
        <Link href="/login" className="btn">Login</Link>
      </nav>
    </header>
  );
}

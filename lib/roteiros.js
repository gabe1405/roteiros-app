import { roteiros } from "../data/roteiros";
import usuarios from "../data/usuarios.json";

export function roteiros_mod() {
  return roteiros.map((r) => {
    const usuario = usuarios.find((u) => u.id === r.autorId);
    return {
      ...r,
      autor: usuario ? usuario.nome : "Autor desconhecido",
    };
  });
}
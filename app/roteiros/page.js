import ListaRoteiros from "../../components/ListaRoteiros";
import { roteiros_mod } from "../../lib/roteiros";

export default function PaginaRoteiros() {
  return <ListaRoteiros roteiros={roteiros_mod()} />;
}
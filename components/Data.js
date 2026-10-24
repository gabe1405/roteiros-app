export default function Data({ valor }) {
  if (!valor) return <span>—</span>;

  const [ano, mes, dia] = valor.split("-");
  return <time dateTime={valor}>{dia}/{mes}/{ano}</time>;
}
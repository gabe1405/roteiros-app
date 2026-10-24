import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Roteiros",
  description: "Encontre e acompanhe roteiros de viagem.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

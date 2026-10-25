import "./globals.css";
import Header from "../components/Header";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Roteiros",
  description: "Encontre e acompanhe roteiros de viagem.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
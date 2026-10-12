import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const titulo = Bricolage_Grotesque({ subsets: ["latin"], variable: "--fuente-titulo" });
const cuerpo = Figtree({ subsets: ["latin"], variable: "--fuente-cuerpo" });

export const metadata = {
  title: "Rumbo — Agencia de viajes",
  description: "Paquetes de viaje por México. Paga con Stripe o Mercado Pago.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${titulo.variable} ${cuerpo.variable}`}>
      <body>
        <header className="barra">
          <a href="/" className="logo">Rumbo</a>
          <span className="barra-nota">Modo de prueba: no se hacen cobros reales</span>
        </header>
        {children}
        <footer className="pie">© Rumbo Viajes · Proyecto de práctica</footer>
      </body>
    </html>
  );
}

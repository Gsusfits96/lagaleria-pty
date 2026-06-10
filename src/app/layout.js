import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import "./editorial.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | La Galería PTY",
    default: "La Galería PTY | Arte que cobra vida en tu espacio",
  },
  description:
    "Descubre obras de arte únicas y visualízalas en tus paredes con Realidad Aumentada. Galería de arte contemporáneo en Panamá con experiencia inmersiva WebAR.",
  keywords: [
    "galería de arte",
    "arte Panamá",
    "realidad aumentada",
    "WebAR",
    "comprar arte",
    "arte contemporáneo",
    "La Galería PTY",
  ],
  openGraph: {
    title: "La Galería PTY | Arte que cobra vida en tu espacio",
    description:
      "Visualiza obras de arte en tus propias paredes con Realidad Aumentada. Sin descargar apps.",
    type: "website",
    locale: "es_PA",
    siteName: "La Galería PTY",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Galería PTY | Arte Inmersivo con AR",
    description:
      "Prueba el arte en tu espacio antes de comprarlo. Experiencia WebAR sin apps.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

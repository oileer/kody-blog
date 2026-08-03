import type { Metadata } from "next";
import { Inter, Audiowide } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import Parallax from "@/components/Parallax";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide" });

export const metadata: Metadata = {
  title: "Euller Lolato — IA, Conteúdo e Automação",
  description:
    "Artigos sobre IA, automação de negócios, conteúdo digital e estratégia. Por Euller Lolato.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${audiowide.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
        </noscript>
        <SmoothScroll />
        <Parallax />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}

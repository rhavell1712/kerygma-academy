import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mispá Treinamentos — Conhecimento teológico em profundidade",
  description:
    "Cursos, PDFs, livros e treinamentos para estudar teologia com profundidade. Um acervo vivo para quem busca um entendimento sólido.",
};

const appearanceInitScript = `(function(){try{var t=localStorage.getItem('kerygma-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var p=localStorage.getItem('kerygma-palette');if(p!=='marinho'&&p!=='dourado'&&p!=='ardosia'&&p!=='kerygma'){p='kerygma';}document.documentElement.dataset.theme=t;document.documentElement.dataset.palette=p;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.palette='kerygma';}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      data-palette="kerygma"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: appearanceInitScript }} />
        {children}
      </body>
    </html>
  );
}
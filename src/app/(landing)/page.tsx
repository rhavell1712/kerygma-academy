import { LandingHeader } from "./header/header";
import { Hero } from "./hero/hero";
import { Plataforma } from "./plataforma/plataforma";
import { Professor } from "./professor/professor";
import { Conteudos } from "./conteudos/conteudos";
import { Depoimento } from "./depoimento/depoimento";
import { Cta } from "./cta/cta";
import { LandingFooter } from "./footer/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink antialiased">
      <LandingHeader />

      <main>
        <Hero />
        <Plataforma />
        <Professor />
        <Conteudos />
        <Depoimento />
        <Cta />
      </main>

      <LandingFooter />
    </div>
  );
}
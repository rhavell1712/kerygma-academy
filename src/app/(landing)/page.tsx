import { LandingHeader } from "./header/header";
import { Hero } from "./hero/hero";
import { Cursos } from "./cursos/cursos";
import { ComoFunciona } from "./mentoria/como-funciona";
import { Professor } from "./professor/professor";
import { LandingFooter } from "./footer/footer";
import { WhatsappFloat } from "./whatsapp/whatsapp-float";
import { AdminFloat } from "./admin-entry/admin-entry";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink antialiased">
      <LandingHeader />

      <main>
        <Hero />
        <Cursos />
        <ComoFunciona />
        <Professor />
      </main>

      <LandingFooter />
      <WhatsappFloat />
      <AdminFloat />
    </div>
  );
}
import { LandingHeader } from "./header/header";
import { Hero } from "./hero/hero";
import { Cursos } from "./cursos/cursos";
import { ComoFunciona } from "./mentoria/como-funciona";
import { Professor } from "./professor/professor";
import { LandingFooter } from "./footer/footer";
import { WhatsappFloat } from "./whatsapp/whatsapp-float";
import { AdminFloat } from "./admin-entry/admin-entry";
import { listMentoriasPublicas } from "@/services/mentorias";
import type { Mentoria } from "@/lib/mentorias";

function mapMentoria(row: Awaited<ReturnType<typeof listMentoriasPublicas>>[number]): Mentoria {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    long: row.long,
    topics: row.topics,
    encontros: row.encontros,
    duracao: row.duracao,
    formato: row.formato,
    paraQuem: row.para_quem,
    level: row.level,
    imageUrl: row.image_url ?? undefined,
    accent: row.accent,
    cover: { from: "#141114", to: row.accent },
  };
}

export default async function LandingPage() {
  const rows = await listMentoriasPublicas();
  const mentorias: Mentoria[] = rows.map(mapMentoria);

  return (
    <div className="min-h-screen bg-bg font-sans text-ink antialiased">
      <LandingHeader />

      <main>
        <Hero />
        <Cursos mentorias={mentorias} />
        <ComoFunciona />
        <Professor />
      </main>

      <LandingFooter />
      <WhatsappFloat />
      <AdminFloat />
    </div>
  );
}

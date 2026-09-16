import type { ContentType } from "@/lib/types";
import { items } from "@/lib/data";
import { ContentCard } from "@/components/platform/content/content-card";
import { TypeBadge } from "@/components/platform/content/type-badge";

const headers: Record<ContentType, { title: string; subtitle: string }> = {
  curso: {
    title: "Cursos",
    subtitle: "Formações completas organizadas em módulos e aulas, com profundidade e acompanhamento.",
  },
  pdf: {
    title: "PDFs e materiais",
    subtitle: "Guias, cadernos e apostilas digitais para estudar a qualquer hora, em qualquer lugar.",
  },
  livro: {
    title: "Livros recomendados",
    subtitle: "Obras selecionadas pelos professores da Kerygma para aprofundar seus estudos.",
  },
  mentoria: {
    title: "Mentorias",
    subtitle: "Acompanhamento individual com professores para dar direção aos seus estudos.",
  },
};

export function CatalogPage({ type }: { type: ContentType }) {
  const header = headers[type];
  const list = items.filter((item) => item.type === type);

  return (
    <div className="mx-auto max-w-310 px-5 pb-16 pt-28 sm:px-8 md:px-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
          {header.title}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">{header.subtitle}</p>
      </header>

      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong py-24 text-center">
          <p className="font-display text-lg font-bold text-ink">Em breve</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5">
          {list.map((item) => (
            <ContentCard key={item.slug} item={item} className="w-full" />
          ))}
        </div>
      )}

      {type === "mentoria" && (
        <div className="mt-12 rounded-lg border border-line-strong bg-panel p-6">
          <TypeBadge item={list[0]} />
          <h2 className="mt-3 font-display text-xl font-bold text-white">
            Como funciona a mentoria
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Após a aquisição, você recebe o contato direto do professor e o
            link de agendamento para escolher os horários dos encontros.
            Cada mentoria é individual e adaptada aos seus objetivos.
          </p>
        </div>
      )}
    </div>
  );
}
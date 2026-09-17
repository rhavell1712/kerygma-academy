import { HeroCarousel } from "@/components/platform/home/hero-carousel";
import { ShowcaseRow } from "@/components/platform/home/showcase-row";
import { ContinueSection } from "@/components/platform/home/continue-section";
import {
  featuredItems,
  continueItems,
  courseItems,
  pdfItems,
  bookItems,
} from "@/lib/data";

export default function PlataformaPage() {
  return (
    <div>
      <HeroCarousel items={featuredItems} />

      <div className="-mt-14 space-y-12 pb-16">
        {continueItems.length > 0 && <ContinueSection items={continueItems} />}

        <ShowcaseRow
          title="Explore outros cursos"
          subtitle="Continue descobrindo as melhores formações"
          items={courseItems.filter((i) => i.featured).slice(0, 5)}
          href="/cursos"
          linkLabel="Conhecer mais cursos"
        />

        <ShowcaseRow
          title="PDFs"
          subtitle="Materiais para estudar no seu ritmo"
          items={pdfItems.slice(0, 4)}
          href="/pdfs"
          linkLabel="Ver mais PDFs"
        />

        <ShowcaseRow
          title="Livros"
          subtitle="Obras recomendadas pelos professores"
          items={bookItems.slice(0, 4)}
          href="/livros"
          linkLabel="Ver mais livros"
        />
      </div>
    </div>
  );
}
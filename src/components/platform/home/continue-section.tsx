import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { ContinueCard } from "@/components/platform/content/continue-card";
import { Reveal } from "@/components/animations/reveal";
import { Stagger } from "@/components/animations/stagger";

type ContinueSectionProps = {
  items: ContentItem[];
};

export function ContinueSection({ items }: ContinueSectionProps) {
  return (
    <section aria-labelledby="continue-heading" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4 px-5 sm:px-8 md:px-10">
        <Reveal direction="up">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-brand" /> Continuidade
            </p>
            <h2
              id="continue-heading"
              className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              Continue assistindo
            </h2>
            <p className="mt-1 text-xs text-ink-faint">
              Retome exatamente de onde você parou.
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" delay={120} className="shrink-0">
          <Link
            href="/biblioteca"
            className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft transition hover:text-white"
          >
            Minha biblioteca
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <Stagger
        direction="x"
        step={80}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-1 sm:-mx-8 sm:px-8 md:-mx-10 md:px-10"
      >
        {items.map((item, index) => (
          <ContinueCard key={item.slug} item={item} index={index} />
        ))}
      </Stagger>
    </section>
  );
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { ContentCard } from "@/components/platform/content/content-card";

type ShowcaseRowProps = {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  href: string;
  linkLabel: string;
};

export function ShowcaseRow({
  title,
  subtitle,
  items,
  href,
  linkLabel,
}: ShowcaseRowProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4 px-5 sm:px-8 md:px-10">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight text-ink">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-xs text-ink-faint">{subtitle}</p>}
        </div>
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-ink-soft transition hover:text-white"
        >
          {linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-1 sm:px-8 md:px-10">
        {items.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
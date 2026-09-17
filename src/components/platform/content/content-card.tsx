import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ContentItem } from "@/lib/types";

import { Cover } from "@/components/shared/cover";
import { TypeBadge } from "./type-badge";

type ContentCardProps = {
  item: ContentItem;
  className?: string;
  placeholderIndex?: number;
};

export function ContentCard({
  item,
  className = "w-44 min-[420px]:w-48 md:w-52",
  placeholderIndex,
}: ContentCardProps) {
  let meta = "";

  if (item.type === "curso") {
    meta = item.modules
      ? `${item.modules} módulos · ${item.lessons} aulas`
      : `${item.lessons} aulas`;
  }

  if (item.type === "pdf") {
    meta = `${item.pages} páginas`;
  }

  if (item.type !== "curso" && item.type !== "pdf") {
    meta = item.duration ?? "";
  }

  return (
    <article
      className={`group flex shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-line-strong bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-pop ${className}`}
    >
      <Link
        href={`/item/${item.slug}`}
        aria-label={item.title}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.06]"
          />
        ) : (
          <Cover
            item={item}
            title={false}
            placeholderIndex={placeholderIndex}
            className="absolute inset-0 h-full w-full transition duration-300 group-hover:scale-[1.06]"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        />

        <TypeBadge
          item={item}
          className="absolute left-3 top-3"
        />

        {item.owned && (
          <span className="absolute right-2.5 top-2.5 rounded-sm bg-white px-2 py-[3px] text-[9px] font-bold uppercase tracking-wider text-black">
            Adquirido
          </span>
        )}

        <span className="absolute bottom-3 left-3 right-3 font-display text-sm font-bold leading-snug text-white drop-shadow-md">
          {item.title}
        </span>

        {item.owned && typeof item.progress === "number" && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
            <div
              className="h-full bg-brand"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink-soft">
          {item.description}
        </p>

        <p className="mt-3 text-xs font-semibold text-ink-faint">
          {meta}
        </p>

        <div className="mt-3 flex justify-end">
          <Link
            href={`/item/${item.slug}`}
            className="group/cta inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-hover"
          >
            Ver detalhes
            <ArrowRight
              size={13}
              className="transition-transform group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
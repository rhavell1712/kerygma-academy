import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { Cover } from "@/components/shared/cover";
import { TypeBadge } from "./type-badge";
import {
  completedCountFor,
  countLessons,
  flattenCurriculum,
} from "@/lib/curriculum";

type ContinueCardProps = {
  item: ContentItem;
  index?: number;
  className?: string;
};

export function ContinueCard({
  item,
  index,
  className = "w-[min(100%,340px)]",
}: ContinueCardProps) {
  const progress = item.progress ?? 0;
  const curriculum = item.type === "curso" ? item.curriculum ?? [] : [];
  const flat = flattenCurriculum(curriculum);
  const total = countLessons(curriculum);
  const completed = completedCountFor(curriculum, progress);
  const currentIndex = total ? Math.min(completed, total) : 0;
  const currentTitle = flat[currentIndex]?.title;

  const isCourse = item.type === "curso";
  const href = isCourse
    ? item.curriculum
      ? `/aulas/${item.slug}`
      : "/biblioteca"
    : `/item/${item.slug}`;
  const cta = isCourse ? "Continuar assistindo" : "Continuar estudando";

  const subline = isCourse
    ? total
      ? `${completed} de ${total} aulas`
      : item.category
    : item.type === "pdf"
      ? `${item.pages} páginas`
      : item.duration ?? item.category;

  return (
    <Link
      href={href}
      className={`group flex shrink-0 snap-start overflow-hidden rounded-lg border border-line-strong bg-card shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-ring hover:shadow-pop ${className}`}
    >
      <div className="relative w-24 shrink-0 overflow-hidden sm:w-28">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="112px"
            className="object-cover transition duration-300 group-hover:scale-[1.05]"
          />
        ) : (
          <Cover
            item={item}
            title={false}
            placeholderIndex={index}
            className="absolute inset-0 h-full w-full transition duration-300 group-hover:scale-[1.05]"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div
            className="h-full bg-brand transition-[width] duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between gap-2">
          <TypeBadge item={item} />
          <span className="shrink-0 text-[11px] font-bold text-brand-hover">
            {progress}%
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-display text-[13px] font-extrabold leading-snug text-white">
          {item.title}
        </h3>

        <p className="mt-1 truncate text-[11px] text-ink-faint">
          {item.category}
          {item.teacher ? ` · ${item.teacher}` : ""}
        </p>

        <div className="mt-auto pt-3">
          <p className="mb-1.5 truncate text-[11px] font-semibold text-ink-soft">
            {isCourse && currentTitle ? `Próxima: ${currentTitle}` : subline}
          </p>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-white transition group-hover:text-brand-hover">
            {cta}
            <ArrowRight
              size={12}
              className="text-brand-hover transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

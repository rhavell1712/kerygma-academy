import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
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
  className = "w-[min(100%,560px)]",
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
      ? currentTitle
        ? `Aula ${currentIndex + 1} de ${total}`
        : ""
      : item.lessons
        ? `${item.modules} módulos · ${item.lessons} aulas`
        : item.category
    : item.type === "pdf"
      ? `${item.pages} páginas`
      : item.duration ?? item.category;

  return (
    <Link
      href={href}
      className={`group grid shrink-0 snap-start grid-cols-[110px_1fr] overflow-hidden rounded-lg border border-line-strong bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-pop sm:grid-cols-[150px_1fr] ${className}`}
    >
      <div className="relative aspect-[3/4] h-full w-full overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div
            className="h-full bg-brand transition-[width] duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <TypeBadge item={item} />
          <span className="text-xs font-bold text-brand-hover">{progress}%</span>
        </div>

        <h3 className="mt-2.5 line-clamp-2 font-display text-base font-extrabold leading-snug text-white">
          {item.title}
        </h3>

        <p className="mt-1 truncate text-xs text-ink-faint">
          {item.category}
          {item.teacher ? ` · ${item.teacher}` : ""}
        </p>

        {isCourse && currentTitle && (
          <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <Play size={11} fill="currentColor" className="shrink-0 text-brand-hover" />
            <span className="truncate">Próxima: {currentTitle}</span>
          </p>
        )}

        <div className="mt-auto pt-3">
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
            <span className="font-bold text-brand-hover">{progress}% concluído</span>
            {total > 0 ? (
              <span className="text-ink-faint">
                {completed} de {total} aulas
              </span>
            ) : subline ? (
              <span className="truncate text-ink-faint">{subline}</span>
            ) : null}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white transition group-hover:text-brand-hover">
            {cta}
            <ArrowRight
              size={13}
              className="text-brand-hover transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
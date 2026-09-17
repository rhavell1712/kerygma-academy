import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Paperclip,
} from "lucide-react";
import type { ContentItem } from "@/lib/types";
import type { FlatLesson } from "@/lib/curriculum";
import { Cover } from "@/components/shared/cover";

type LessonPlayerProps = {
  item: ContentItem;
  lesson: FlatLesson;
  lessonNumber: number;
  totalLessons: number;
  progress: number;
  completedCount: number;
  isCurrentDone: boolean;
  onToggleDone: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

export function LessonPlayer({
  item,
  lesson,
  lessonNumber,
  totalLessons,
  progress,
  completedCount,
  isCurrentDone,
  onToggleDone,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LessonPlayerProps) {
  const materials = lesson.materials ?? [];

  return (
    <div className="min-w-0">
      <div
        key={lesson.id}
        className="animate-fade-up relative aspect-video overflow-hidden rounded-lg bg-black shadow-pop ring-1 ring-white/10"
      >
        <Cover item={item} className="absolute inset-0 h-full w-full opacity-60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
            <Clock size={11} />
            {lesson.duration}
          </span>
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            className="grid h-16 w-16 place-items-center rounded-full bg-white text-black shadow-brand transition hover:scale-105 hover:bg-brand-hover hover:text-white"
            aria-label={`Reproduzir vídeo: ${lesson.title}`}
          >
            <span className="ml-1">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-3 flex flex-wrap items-center justify-between gap-2">
          <p className="truncate text-xs font-semibold text-ink-soft">
            Player de vídeo · serviço de streaming externo
          </p>
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
            Aula {lessonNumber} de {totalLessons}
          </span>
        </div>
      </div>

      <div key={`info-${lesson.id}`} className="animate-fade-up mt-5">
        <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          <span className="rounded-sm bg-brand-soft px-2 py-0.5 text-brand-hover">
            Módulo {String(lesson.moduleIndex + 1).padStart(2, "0")}
          </span>
          <span className="truncate normal-case tracking-normal text-ink-soft">
            {lesson.moduleTitle}
          </span>
        </p>

        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {lesson.title}
        </h1>

        {lesson.description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {lesson.description}
          </p>
        ) : (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-faint">
            Sem descrição disponível para esta aula neste momento.
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="h-1.5 w-56 max-w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-ink-soft">
            {progress}% · {completedCount}/{totalLessons} aulas concluídas
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <button
            type="button"
            onClick={onToggleDone}
            className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition active:scale-[0.98] ${
              isCurrentDone
                ? "bg-white text-black hover:bg-brand-hover hover:text-white"
                : "bg-brand text-white shadow-brand hover:bg-brand-hover"
            }`}
          >
            <CheckCircle2
              key={isCurrentDone ? "done" : "todo"}
              size={16}
              className={isCurrentDone ? "animate-pop" : ""}
            />
            {isCurrentDone ? "Aula concluída" : "Marcar aula como concluída"}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <section className="mt-8 rounded-lg border border-line-strong bg-panel">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/5 text-ink-soft">
            <Paperclip size={16} />
          </span>
          <div>
            <h2 className="font-display text-sm font-bold text-white">
              Materiais complementares
            </h2>
            <p className="text-[11px] text-ink-faint">
              Arquivos e leituras de apoio desta aula
            </p>
          </div>
        </div>

        {materials.length > 0 ? (
          <ul className="divide-y divide-line">
            {materials.map((material) => (
              <li
                key={material}
                className="flex items-center gap-3 px-5 py-3.5 text-sm text-ink-soft"
              >
                <FileText size={15} className="shrink-0 text-brand-hover" />
                {material}
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-5 py-6 text-sm text-ink-faint">
            Nenhum material complementar disponível para esta aula neste momento.
          </div>
        )}
      </section>
    </div>
  );
}
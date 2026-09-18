"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock, Lock, Play } from "lucide-react";
import type { Module } from "@/lib/types";
import { formatMinutes, lessonId, moduleMinutes } from "@/lib/curriculum";

type CourseCurriculumProps = {
  modules: Module[];
  defaultOpen?: number | null;
  completed?: string[];
  onLessonClick?: (id: string) => void;
  selectedId?: string | null;
  lockedIds?: string[];
  className?: string;
};

export function CourseCurriculum({
  modules,
  defaultOpen = 0,
  completed = [],
  onLessonClick,
  selectedId = null,
  lockedIds = [],
  className = "",
}: CourseCurriculumProps) {
  const [open, setOpen] = useState<number | null>(
    defaultOpen === null ? null : Math.min(defaultOpen, modules.length - 1),
  );

  const hasProgress = completed.length > 0;

  return (
    <div className={`space-y-3 ${className}`}>
      {modules.map((module, mi) => {
        const isOpen = open === mi;
        const minutes = moduleMinutes(module);
        const moduleIds = module.lessons.map((_, li) => lessonId(mi, li));
        const doneInModule = moduleIds.filter((id) => completed.includes(id)).length;
        const modulePercent =
          module.lessons.length > 0
            ? Math.round((doneInModule / module.lessons.length) * 100)
            : 0;

        return (
          <div
            key={module.title}
            className={`overflow-hidden rounded-lg border bg-panel transition-colors duration-300 ${
              isOpen ? "border-brand-ring/50" : "border-line-strong hover:border-white/25"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : mi)}
              aria-expanded={isOpen}
              aria-controls={`curriculum-panel-${mi}`}
              className="group flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-md font-display text-sm font-extrabold transition-colors duration-300 ${
                  isOpen ? "bg-brand text-white" : "bg-brand/15 text-brand-hover"
                }`}
              >
                {String(mi + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Módulo {String(mi + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-white transition-colors group-hover:text-brand-hover sm:text-base">
                  {module.title}
                </span>
              </span>

              {hasProgress && module.lessons.length > 0 && (
                <span className="hidden shrink-0 items-center gap-2 text-xs font-medium text-ink-faint sm:flex">
                  <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-brand transition-[width] duration-700"
                      style={{ width: `${modulePercent}%` }}
                    />
                  </span>
                  <span>{doneInModule}/{module.lessons.length}</span>
                </span>
              )}

              <span className="hidden shrink-0 items-center gap-4 text-xs font-medium text-ink-faint sm:flex">
                <span className="inline-flex items-center gap-1.5">
                  <Play size={12} /> {module.lessons.length} aulas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} /> {formatMinutes(minutes)}
                </span>
              </span>

              <ChevronDown
                size={18}
                className={`shrink-0 text-ink-soft transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-hover" : ""
                }`}
              />
            </button>

            <div
              id={`curriculum-panel-${mi}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="border-t border-line px-2 py-2 sm:px-3">
                  {module.lessons.map((lesson, li) => {
                    const id = lessonId(mi, li);
                    const isDone = completed.includes(id);
                    const isLocked = lockedIds.includes(id);
                    const isSelected = selectedId === id;

                    const rowContent = (
                      <>
                        <span className="w-5 shrink-0 text-center font-mono text-[11px] text-ink-faint transition-colors group-hover/lesson:text-brand-hover">
                          {mi + 1}.{li + 1}
                        </span>

                        {isDone ? (
                          <CheckCircle2
                            size={15}
                            className="animate-pop shrink-0 text-brand-hover"
                            aria-hidden="true"
                          />
                        ) : isLocked ? (
                          <Lock size={13} className="shrink-0 text-ink-faint/70" aria-hidden="true" />
                        ) : (
                          <Play
                            size={14}
                            fill="currentColor"
                            className="shrink-0 text-ink-faint transition-colors group-hover/lesson:text-brand-hover"
                            aria-hidden="true"
                          />
                        )}

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span
                              className={`min-w-0 truncate text-sm transition-colors group-hover/lesson:text-white ${
                                isDone ? "text-ink-faint" : "text-ink-soft"
                              } ${isDone ? "line-through decoration-ink-faint/40" : ""}`}
                            >
                              {lesson.title}
                            </span>

                            {lesson.free && (
                              <span className="shrink-0 rounded-sm border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                                Grátis
                              </span>
                            )}
                          </span>

                          {lesson.description && (
                            <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-ink-faint">
                              {lesson.description}
                            </span>
                          )}
                        </span>

                        <span className="shrink-0 text-xs font-semibold text-ink-faint">
                          {lesson.duration}
                        </span>
                      </>
                    );

                    if (onLessonClick) {
                      return (
                        <li key={`${mi}-${li}`}>
                          <button
                            type="button"
                            disabled={isLocked}
                            onClick={() => onLessonClick(id)}
                            aria-current={isSelected ? "true" : undefined}
                            aria-label={lesson.title}
                            className={`group/lesson flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                              isSelected
                                ? "bg-brand-soft ring-1 ring-inset ring-brand-ring/40"
                                : "hover:bg-white/5"
                            }`}
                          >
                            {rowContent}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={`${mi}-${li}`}
                        className="group/lesson flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-white/5"
                      >
                        {rowContent}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
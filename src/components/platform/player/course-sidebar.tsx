import { CheckCircle2, Clock, Lock } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import type { FlatLesson } from "@/lib/curriculum";

type CourseSidebarProps = {
  item: ContentItem;
  flat: FlatLesson[];
  totalLessons: number;
  completedCount: number;
  percent: number;
  selectedId: string;
  done: Record<string, boolean>;
  lockedIds?: string[];
  onSelect?: (id: string) => void;
  className?: string;
};

type ModuleGroup = {
  moduleIndex: number;
  moduleTitle: string;
  lessons: FlatLesson[];
};

function groupByModule(flat: FlatLesson[]): ModuleGroup[] {
  const map = new Map<number, FlatLesson[]>();
  flat.forEach((lesson) => {
    const group = map.get(lesson.moduleIndex) ?? [];
    group.push(lesson);
    map.set(lesson.moduleIndex, group);
  });
  return [...map.entries()].map(([moduleIndex, lessons]) => ({
    moduleIndex,
    moduleTitle: lessons[0]?.moduleTitle ?? "",
    lessons,
  }));
}

export function CourseSidebar({
  item,
  flat,
  totalLessons,
  completedCount,
  percent,
  selectedId,
  done,
  lockedIds = [],
  onSelect,
  className = "flex flex-col",
}: CourseSidebarProps) {
  const groups = groupByModule(flat);

  return (
    <aside
      aria-label={`Conteúdo do curso: ${item.title}`}
      className={`overflow-hidden rounded-lg border border-line-strong bg-panel ${className}`}
    >
      <header className="border-b border-line p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          Conteúdo do curso
        </p>
        <h3 className="mt-1 truncate font-display text-sm font-extrabold tracking-tight text-white">
          {item.title}
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-bold text-ink-soft">{percent}%</span>
        </div>
        <p className="mt-1.5 text-xs text-ink-faint">
          {completedCount} de {totalLessons} aulas concluídas
        </p>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {groups.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-ink-faint">
            A estrutura deste curso será publicada em breve.
          </div>
        ) : (
          groups.map((group) => (
            <div
              key={group.moduleIndex}
              className="border-b border-line last:border-b-0"
            >
              <div className="px-4 pb-1 pt-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Módulo {String(group.moduleIndex + 1).padStart(2, "0")}
                </p>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-bold text-white">
                    {group.moduleTitle}
                  </span>
                  <span className="shrink-0 text-[10px] font-semibold text-ink-faint">
                    {group.lessons.length} aulas
                  </span>
                </div>
              </div>

              <ul aria-label={group.moduleTitle} className="px-2 pb-2 pt-0.5">
                {group.lessons.map((lesson) => {
                  const id = lesson.id;
                  const isActive = selectedId === id;
                  const isDone = Boolean(done[id]);
                  const isLocked = lockedIds.includes(id);

                  return (
                    <li key={id}>
                      <button
                        type="button"
                        disabled={isLocked}
                        onClick={() => onSelect?.(id)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={lesson.title}
                        className={`relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                          isActive ? "bg-brand-soft" : "hover:bg-white/5"
                        }`}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand"
                          />
                        )}

                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                            isActive
                              ? "bg-brand text-white"
                              : isDone
                                ? "bg-brand-soft text-brand-hover"
                                : "text-ink-faint"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 size={14} className="animate-pop" aria-hidden="true" />
                          ) : isLocked ? (
                            <Lock size={12} aria-hidden="true" />
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-[13px] ${
                              isActive
                                ? "font-bold text-white"
                                : isDone
                                  ? "text-ink-faint"
                                  : "text-ink-soft"
                            }`}
                          >
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-faint">
                            <Clock size={10} /> {lesson.duration}
                          </span>
                        </span>

                        {isDone && !isActive && (
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-ink-faint">
                            Feita
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ChevronDown, ListVideo } from "lucide-react";
import { findBySlug } from "@/lib/data";
import {
  flattenCurriculum,
  initialLessonId,
  seedCompletedIds,
} from "@/lib/curriculum";
import { LessonPlayer } from "@/components/platform/player/lesson-player";
import { CourseSidebar } from "@/components/platform/player/course-sidebar";

export default function CoursePlayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = findBySlug(slug);

  const modules = useMemo(
    () =>
      item && item.type === "curso" && item.curriculum ? item.curriculum : [],
    [item],
  );
  const progress = item && item.owned ? (item.progress ?? 0) : 0;

  const flat = useMemo(() => flattenCurriculum(modules), [modules]);
  const seeded = useMemo(
    () => seedCompletedIds(modules, progress),
    [modules, progress],
  );

  const [done, setDone] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    seeded.forEach((id) => {
      initial[id] = true;
    });
    return initial;
  });
  const [selectedId, setSelectedId] = useState<string>(() =>
    flat.length ? initialLessonId(modules, progress) : "",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!item || item.type !== "curso") notFound();
  if (!item.curriculum) redirect(`/item/${item.slug}`);
  if (!item.owned) redirect(`/item/${item.slug}`);

  const total = flat.length;
  const completed = flat.filter((lesson) => done[lesson.id]).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const currentIndex = Math.max(
    0,
    flat.findIndex((lesson) => lesson.id === selectedId),
  );
  const current = flat[currentIndex] ?? null;

  const handleSelect = (id: string) => setSelectedId(id);

  const handleToggleDone = (id: string, advance = true) => {
    const isAlreadyDone = Boolean(done[id]);
    const next = { ...done, [id]: !isAlreadyDone };
    setDone(next);

    if (!isAlreadyDone && advance) {
      const idx = flat.findIndex((lesson) => lesson.id === id);
      const nextLesson = flat[idx + 1];
      if (nextLesson) setSelectedId(nextLesson.id);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setSelectedId(flat[currentIndex - 1].id);
      setMobileOpen(false);
    }
  };

  const goNext = () => {
    if (currentIndex < total - 1) {
      setSelectedId(flat[currentIndex + 1].id);
      setMobileOpen(false);
    }
  };

  const sidebarProps = {
    item,
    flat,
    totalLessons: total,
    completedCount: completed,
    percent,
    selectedId,
    done,
    onSelect: handleSelect,
  };

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-24 sm:px-8 md:px-10">
      <nav className="mb-6 flex flex-wrap items-center justify-between gap-3" aria-label="Navegação da aula">
        <Link
          href="/biblioteca"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Minha biblioteca
        </Link>
        <p className="truncate font-display text-sm font-bold text-white">
          {item.title}
        </p>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0">
          {current && (
            <LessonPlayer
              item={item}
              lesson={current}
              lessonNumber={currentIndex + 1}
              totalLessons={total}
              progress={percent}
              completedCount={completed}
              isCurrentDone={Boolean(done[current.id])}
              onToggleDone={() => handleToggleDone(current.id, true)}
              onPrev={goPrev}
              onNext={goNext}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < total - 1}
            />
          )}

          <section className="mt-6 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-line-strong bg-panel px-4 py-3 text-sm font-bold text-white transition hover:border-brand-ring"
            >
              <span className="inline-flex items-center gap-2">
                <ListVideo size={16} className="text-brand-hover" />
                Conteúdo do curso
              </span>
              <ChevronDown
                size={17}
                className={`text-ink-soft transition-transform duration-300 ${
                  mobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                mobileOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pt-4">
                  <CourseSidebar {...sidebarProps} className="flex flex-col" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <CourseSidebar
          {...sidebarProps}
          className="hidden flex-col lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-7rem)] lg:self-start"
        />
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, CheckCircle2, Lock, Clock } from "lucide-react";
import { findBySlug } from "@/lib/data";
import { Cover } from "@/components/shared/cover";

export default function CoursePlayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = findBySlug(slug);
  const [done, setDone] = useState<Record<string, boolean>>({});

  if (!item || item.type !== "curso" || !item.curriculum) notFound();

  const totalLessons = item.curriculum.flatMap((m) => m.lessons).length;
  const completed = item.curriculum.flatMap((m) => m.lessons).filter((l) => done[l.title]).length;
  const percent = Math.round((completed / totalLessons) * 100);

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 md:px-10">
      <Link
        href="/biblioteca"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Minha biblioteca
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-pop ring-1 ring-white/10">
            <Cover item={item} className="absolute inset-0 h-full w-full opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                className="grid h-16 w-16 place-items-center rounded-full bg-white text-black shadow-brand transition hover:scale-105 hover:bg-brand-hover hover:text-white"
                aria-label="Reproduzir vídeo"
              >
                <Play size={26} fill="currentColor" className="ml-1" />
              </button>
            </div>
            <p className="absolute bottom-3 left-4 text-xs font-semibold text-ink-soft">
              Player de vídeo · serviço de streaming externo
            </p>
          </div>

          <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {item.title}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">{item.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-ink-soft">
              {percent}% · {completed}/{totalLessons} aulas concluídas
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setDone((prev) => ({ ...prev, current: true }))
            }
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            <CheckCircle2 size={16} />
            Marcar aula como concluída
          </button>
        </div>

        <aside>
          <h2 className="mb-4 font-display text-base font-bold text-white">
            Conteúdo do curso
          </h2>

          <div className="space-y-4">
            {item.curriculum.map((module) => (
              <div key={module.title} className="rounded-lg border border-line-strong bg-card">
                <p className="border-b border-line px-4 py-3 text-sm font-display font-bold text-white">
                  {module.title}
                </p>
                <ul className="divide-y divide-line">
                  {module.lessons.map((lesson) => {
                    const isDone = done[lesson.title];
                    return (
                      <li
                        key={lesson.title}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        {isDone ? (
                          <CheckCircle2 size={16} className="shrink-0 text-brand-hover" />
                        ) : (
                          <Play size={14} className="shrink-0 text-ink-soft" />
                        )}

                        <div className="min-w-0 flex-1">
                          <p className={`truncate text-sm ${isDone ? "text-ink-faint line-through" : "text-ink-soft"}`}>
                            {lesson.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-faint">
                            <Clock size={10} /> {lesson.duration}
                          </p>
                        </div>

                        <Lock size={13} className="shrink-0 text-ink-faint/50" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
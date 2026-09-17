import type { Module } from "./types";

export type FlatLesson = {
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  moduleTitle: string;
  title: string;
  duration: string;
  description?: string;
  free?: boolean;
  materials?: string[];
};

export function lessonId(moduleIndex: number, lessonIndex: number): string {
  return `${moduleIndex}:${lessonIndex}`;
}

export function parseMinutes(duration: string): number {
  if (!duration) return 0;
  const hours = duration.match(/(\d+)\s*h/);
  const minutes = duration.match(/(\d+)\s*min/);
  let total = 0;
  if (hours) total += Number(hours[1]) * 60;
  if (minutes) total += Number(minutes[1]);
  return total;
}

export function formatMinutes(mins: number): string {
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (hours > 0 && rest > 0) return `${hours}h ${rest}min`;
  if (hours > 0) return `${hours}h`;
  return `${rest}min`;
}

export function countLessons(modules: Module[]): number {
  return modules.reduce((acc, module) => acc + module.lessons.length, 0);
}

export function moduleMinutes(module: Module): number {
  return module.lessons.reduce(
    (acc, lesson) => acc + parseMinutes(lesson.duration),
    0,
  );
}

export function flattenCurriculum(modules: Module[]): FlatLesson[] {
  return modules.flatMap((module, mi) =>
    module.lessons.map((lesson, li) => ({
      id: lessonId(mi, li),
      moduleIndex: mi,
      lessonIndex: li,
      moduleTitle: module.title,
      title: lesson.title,
      duration: lesson.duration,
      ...(lesson.description ? { description: lesson.description } : {}),
      ...(lesson.free ? { free: true } : {}),
      ...(lesson.materials && lesson.materials.length
        ? { materials: lesson.materials }
        : {}),
    })),
  );
}

export function completedCountFor(modules: Module[], percent: number): number {
  const total = countLessons(modules);
  if (!total || percent <= 0) return 0;
  if (percent >= 100) return total;
  return Math.round((percent / 100) * total);
}

export function seedCompletedIds(
  modules: Module[],
  percent: number,
): Set<string> {
  const completed = completedCountFor(modules, percent);
  if (completed === 0) return new Set();
  return new Set(flattenCurriculum(modules).slice(0, completed).map((l) => l.id));
}

export function initialLessonId(modules: Module[], percent: number): string {
  const flat = flattenCurriculum(modules);
  if (flat.length === 0) return "";
  const completed = completedCountFor(modules, percent);
  return flat[Math.min(completed, flat.length - 1)].id;
}
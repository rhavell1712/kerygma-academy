"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Play, Plus, Check } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { TypeBadge } from "@/components/platform/content/type-badge";

type HeroCarouselProps = {
  items: ContentItem[];
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [inList, setInList] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % items.length) + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, items.length]);

  const item = items[index];

  return (
    <section
      className="relative h-[68vh] min-h-[440px] w-full overflow-hidden lg:h-[82vh] lg:min-h-[540px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {items.map((slide, i) => (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `linear-gradient(140deg, ${slide.cover.from} 0%, ${slide.cover.to} 130%)`,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 45%),radial-gradient(circle at 85% 80%, rgba(255,255,255,0.05), transparent 50%)",
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1240px] flex-col justify-end px-5 pb-16 sm:px-8 md:px-10 lg:pb-24">
        <div key={item.slug} className="max-w-[640px] animate-fade-up">
          <div className="mb-4 flex items-center gap-3">
            <TypeBadge item={item} />
            <span className="text-xs font-semibold text-ink-soft">
              {item.category}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[0.98] tracking-tight text-white">
            {item.title}
          </h1>

          <p className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-ink-soft sm:mt-5">
            {item.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-ink-soft">
            <span>{"★".repeat(Math.round(item.rating))} {item.rating.toFixed(1)}</span>
            {item.lessons && <span>{item.lessons} aulas</span>}
            {item.modules && <span>{item.modules} módulos</span>}
            {item.level && <span>Nível {item.level}</span>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <Link
              href={`/item/${item.slug}`}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
            >
              <Play size={16} fill="currentColor" />
              Ver curso
            </Link>

            <button
              type="button"
              onClick={() =>
                setInList((prev) => ({ ...prev, [item.slug]: !!prev[item.slug] ? false : true }))
              }
              aria-pressed={!!inList[item.slug]}
              className={`inline-flex items-center justify-center gap-2 rounded-md border px-6 py-2.5 text-sm font-bold transition ${
                inList[item.slug]
                  ? "border-brand bg-brand text-white"
                  : "border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/60"
              }`}
            >
              {inList[item.slug] ? (
                <>
                  <Check size={16} /> Na minha lista
                </>
              ) : (
                <>
                  <Plus size={16} /> Minha lista
                </>
              )}
            </button>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-7 flex items-center gap-3 sm:inset-x-8 md:inset-x-10">
          {items.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              aria-label={slide.title}
              onClick={() => go(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-white" : "w-6 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Avançar"
              onClick={() => go(index + 1)}
              className="hidden h-9 items-center justify-center rounded-md border border-white/20 bg-black/25 px-2 text-white backdrop-blur hover:bg-white/10 md:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
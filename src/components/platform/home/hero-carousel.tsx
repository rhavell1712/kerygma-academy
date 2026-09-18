"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
  Plus,
} from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TypeBadge } from "@/components/platform/content/type-badge";

const SLIDE_DURATION = 6000;

type HeroCarouselProps = {
  items: ContentItem[];
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [inList, setInList] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const reduced = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      progressRef.current = 0;
      setProgress(0);
      setIndex(((next % items.length) + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || reduced || items.length <= 1) return;

    let raf = 0;
    const startedAt = performance.now();
    const from = progressRef.current;

    const tick = (now: number) => {
      const next = Math.min(1, from + (now - startedAt) / SLIDE_DURATION);
      progressRef.current = next;
      setProgress(next);

      if (next >= 1) {
        progressRef.current = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % items.length);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, reduced, items.length]);

  if (items.length === 0) return null;

  const item = items[Math.min(index, items.length - 1)];

  return (
    <section
      className="relative h-[68vh] min-h-[440px] w-full overflow-hidden lg:h-[82vh] lg:min-h-[540px]"
      aria-label="Destaques da plataforma"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {items.map((slide, i) => (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out ${
              i === index ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"
            }`}
            style={{
              background: `linear-gradient(140deg, ${slide.cover.from} 0%, ${slide.cover.to} 130%)`,
            }}
          >
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
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

      <div className="relative mx-auto flex h-full max-w-[1240px] flex-col justify-end px-5 pb-24 sm:px-8 md:px-10 lg:pb-28">
        <div key={item.slug} className="max-w-[640px]">
          <div
            className="carousel-anim mb-4 flex items-center gap-3"
            style={{ "--carousel-delay": "40ms" } as CSSProperties}
          >
            <TypeBadge item={item} />
            <span className="text-xs font-semibold text-ink-soft">
              {item.category}
            </span>
          </div>

          <h1
            className="carousel-anim font-display text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[0.98] tracking-tight text-white"
            style={{ "--carousel-delay": "140ms" } as CSSProperties}
          >
            {item.title}
          </h1>

          <p
            className="carousel-anim mt-4 max-w-[540px] text-[15px] leading-relaxed text-ink-soft sm:mt-5"
            style={{ "--carousel-delay": "260ms" } as CSSProperties}
          >
            {item.description}
          </p>

          <div
            className="carousel-anim mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-ink-soft"
            style={{ "--carousel-delay": "360ms" } as CSSProperties}
          >
            <span>{"★".repeat(Math.round(item.rating))} {item.rating.toFixed(1)}</span>
            {item.lessons && <span>{item.lessons} aulas</span>}
            {item.modules && <span>{item.modules} módulos</span>}
            {item.level && <span>Nível {item.level}</span>}
          </div>

          <div
            className="carousel-anim mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row"
            style={{ "--carousel-delay": "470ms" } as CSSProperties}
          >
            <Link
              href={`/item/${item.slug}`}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-brand-hover hover:text-white"
            >
              <Play size={16} fill="currentColor" />
              Ver detalhes
            </Link>

            <button
              type="button"
              onClick={() =>
                setInList((prev) => ({ ...prev, [item.slug]: !prev[item.slug] }))
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

        <div className="absolute right-10 top-1/2 hidden w-56 -translate-y-1/2 xl:right-20 lg:block">
          <div
            key={`frame-${item.slug}`}
            className="carousel-scale relative aspect-4/5"
            style={{ "--carousel-delay": "80ms" } as CSSProperties}
          >
            <div className="absolute inset-0 rotate-2 overflow-hidden rounded-lg shadow-pop ring-1 ring-white/15">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, ${item.cover.from} 0%, ${item.cover.to} 130%)`,
                }}
              />

              {item.imageUrl ? (
                <>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                </>
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.10), transparent 45%),radial-gradient(circle at 85% 95%, rgba(255,255,255,0.06), transparent 50%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-black/30 text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
                      <ImageIcon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="rounded-full bg-black/35 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                      imagem {index + 1}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-3 px-5">
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Selecionar destaque"
          >
            {items.map((slide, i) => {
              const active = i === index;
              const fill = active ? (reduced ? 100 : Math.min(progress, 1) * 100) : 0;

              return (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={active}
                  aria-label={`Ver destaque: ${slide.title}`}
                  className={`relative h-[5px] w-12 overflow-hidden rounded-full transition-colors duration-300 sm:w-14 ${
                    active ? "bg-white/25" : "bg-white/20 hover:bg-white/35"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{ width: `${fill}%` }}
                  />
                </button>
              );
            })}
          </div>

          <div className="ml-1 hidden items-center gap-1.5 md:flex">
            <button
              type="button"
              aria-label="Destaque anterior"
              onClick={() => go(index - 1)}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/20 bg-black/25 text-white backdrop-blur transition hover:bg-white/10"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              aria-label="Próximo destaque"
              onClick={() => go(index + 1)}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/20 bg-black/25 text-white backdrop-blur transition hover:bg-white/10"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
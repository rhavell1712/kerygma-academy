"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type HeroScrollProps = {
  children: ReactNode;
};

export function HeroScroll({ children }: HeroScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const t = Math.min(1, Math.max(0, (progress - 0.08) / 0.24));
      const scale = 1 - t * 0.025;

      element.style.opacity = String(1 - t);
      element.style.transform = `translate3d(0, ${(-t * 36).toFixed(1)}px, 0) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
    };

    update();
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{
        transformOrigin: "center top",
        willChange: "transform, opacity",
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
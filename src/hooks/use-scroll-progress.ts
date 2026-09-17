"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

type ScrollProgress<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  progress: number;
};

export function useScrollProgress<T extends HTMLElement>(): ScrollProgress<T> {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      if (total <= 0) return;

      const passed = Math.min(Math.max(-rect.top, 0), total);
      const next = passed / total;
      if (Math.abs(next - last.current) > 0.003) {
        last.current = next;
        setProgress(next);
      }
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
  }, []);

  return { ref, progress };
}
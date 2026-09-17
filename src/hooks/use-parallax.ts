"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function useParallax<T extends HTMLElement>(
  speed = 0.12,
  axis: "x" | "y" = "y",
) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || Math.abs(speed) < 0.0001) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      element.style.transform =
        axis === "y"
          ? `translate3d(0, ${offset.toFixed(1)}px, 0)`
          : `translate3d(${offset.toFixed(1)}px, 0, 0)`;
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
      element.style.transform = "";
    };
  }, [speed, axis, reduced]);

  return ref;
}
"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -12% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
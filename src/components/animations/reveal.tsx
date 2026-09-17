"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = {
  children?: ReactNode;
  direction?: "up" | "left" | "right" | "scale" | "clip" | "grow" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 900,
  className = "",
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  once = true,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin,
    threshold,
    once,
  });

  return (
    <div
      ref={ref}
      data-direction={direction}
      data-visible={inView}
      className={`reveal ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
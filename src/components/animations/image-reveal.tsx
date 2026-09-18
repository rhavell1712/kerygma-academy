"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
};

export function ImageReveal({
  children,
  className = "",
  delay = 0,
  rootMargin = "0px 0px -12% 0px",
}: ImageRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin,
    threshold: 0.15,
    once: false,
  });

  return (
    <div
      ref={ref}
      data-visible={inView}
      className={`image-reveal ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
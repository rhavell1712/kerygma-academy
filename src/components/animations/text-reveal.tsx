"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import { useInView } from "@/hooks/use-in-view";

type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  step?: number;
  className?: string;
  rootMargin?: string;
};

export function TextReveal({
  children,
  delay = 0,
  step = 90,
  className = "",
  rootMargin = "0px 0px -12% 0px",
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin,
    threshold: 0.1,
    once: false,
  });

  const units = Children.toArray(children);

  return (
    <div ref={ref} data-text-reveal data-visible={inView} className={className}>
      {units.map((unit, index) => (
        <span key={index} className="text-reveal-mask">
          <span
            className="text-reveal-inner"
            style={{ transitionDelay: `${delay + index * step}ms` }}
          >
            {unit}
          </span>
        </span>
      ))}
    </div>
  );
}
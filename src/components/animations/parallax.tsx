"use client";

import type { CSSProperties, ReactNode } from "react";
import { useParallax } from "@/hooks/use-parallax";

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  axis?: "x" | "y";
  className?: string;
};

export function Parallax({
  children,
  speed = 0.12,
  axis = "y",
  className = "",
}: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>(speed, axis);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" } as CSSProperties}>
      {children}
    </div>
  );
}
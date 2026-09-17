"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { useInView } from "@/hooks/use-in-view";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "x" | "scale";
  delay?: number;
  step?: number;
  rootMargin?: string;
};

export function Stagger({
  children,
  className = "",
  direction = "up",
  delay = 0,
  step = 90,
  rootMargin = "0px 0px -12% 0px",
}: StaggerProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin,
    threshold: 0.08,
  });

  const decorated = Children.toArray(children).map((child, index) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<{ style?: CSSProperties }>;
    return cloneElement(element, {
      style: {
        ...element.props.style,
        "--stagger-i": index,
        "--stagger-delay": `${delay}ms`,
        "--stagger-step": `${step}ms`,
      } as CSSProperties,
    });
  });

  return (
    <div
      ref={ref}
      data-stagger
      data-direction={direction}
      data-visible={inView}
      className={className}
    >
      {decorated}
    </div>
  );
}
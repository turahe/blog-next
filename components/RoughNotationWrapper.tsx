"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";

type RoughNotationType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface RoughNotationWrapperProps {
  children: ReactNode;
  type?: RoughNotationType;
  color?: string;
  animationDelay?: number;
}

export function RoughNotationWrapper({
  children,
  type = "highlight",
  color = "#fbbf24",
  animationDelay = 0,
}: RoughNotationWrapperProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const annotation = annotate(el, {
      type,
      color,
      animationDuration: 800,
    });

    const timer = window.setTimeout(() => {
      annotation.show();
    }, animationDelay);

    return () => {
      window.clearTimeout(timer);
      annotation.remove();
    };
  }, [type, color, animationDelay]);

  return (
    <span ref={ref} className="inline">
      {children}
    </span>
  );
}

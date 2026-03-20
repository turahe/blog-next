"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";

type BlogScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Slight stagger for stacked sections (seconds). */
  delay?: number;
};

/** Subtle fade + lift on enter; respects reduced motion. */
export function BlogScrollReveal({ children, className, delay = 0 }: BlogScrollRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={clsx(className)}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.42,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

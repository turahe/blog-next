"use client";

import type { MotionValue } from "motion/react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { GradientOrbs } from "@/components/GradientOrbs";

type HeroBackdropProps = {
  scrollYProgress: MotionValue<number>;
};

export function HeroBackdrop({ scrollYProgress }: HeroBackdropProps) {
  const reduce = useReducedMotion();
  const noiseY = useTransform(scrollYProgress, (p) => (reduce ? 0 : -p * 5));
  const meshY = useTransform(scrollYProgress, (p) => (reduce ? 0 : -p * 11));
  const orbsY = useTransform(scrollYProgress, (p) => (reduce ? 0 : -p * 17));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.05] dark:mix-blend-soft-light"
        style={{
          y: noiseY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <motion.div className="absolute inset-0" style={{ y: meshY }}>
        <motion.div
          className="absolute inset-0 opacity-[0.42] dark:opacity-[0.22]"
          style={{
            backgroundImage: `linear-gradient(
              118deg,
              oklch(0.656 0.241 354.308 / 0.32) 0%,
              oklch(0.52 0.15 290 / 0.2) 42%,
              oklch(0.55 0.12 250 / 0.16) 100%
            )`,
            backgroundSize: "200% 200%",
          }}
          initial={false}
          animate={
            reduce
              ? { backgroundPosition: "50% 50%" }
              : { backgroundPosition: ["10% 30%", "90% 70%", "10% 30%"] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 28, repeat: Infinity, ease: "linear" }
          }
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent dark:from-slate-900/85 dark:via-slate-900/30 dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(255,255,255,0.55),transparent)] dark:bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />
      <GradientOrbs translateY={orbsY} />
    </div>
  );
}

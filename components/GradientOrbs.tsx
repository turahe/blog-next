"use client";

import type { MotionValue } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

const orbs = [
  {
    className:
      "left-[-10%] top-[10%] h-[42vmin] w-[42vmin] rounded-full bg-primary-500/25 blur-3xl dark:bg-primary-400/15",
    delay: 0,
    driftDuration: 26,
    driftDelay: 0,
  },
  {
    className:
      "right-[-5%] top-[35%] h-[38vmin] w-[38vmin] rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-400/12",
    delay: 0.35,
    driftDuration: 32,
    driftDelay: 0.8,
  },
  {
    className:
      "bottom-[5%] left-[25%] h-[36vmin] w-[36vmin] rounded-full bg-sky-500/15 blur-3xl dark:bg-sky-400/10",
    delay: 0.65,
    driftDuration: 24,
    driftDelay: 1.4,
  },
] as const;

type GradientOrbsProps = {
  translateY?: MotionValue<number>;
};

export function GradientOrbs({ translateY }: GradientOrbsProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={translateY ? { y: translateY } : undefined}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.className}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : {
                  opacity: 1,
                  scale: [1, 1.035, 1],
                  x: [0, 8, -6, 5, 0],
                  y: [0, -10, 4, -5, 0],
                }
          }
          transition={{
            opacity: { duration: 0.85, delay: orb.delay },
            scale: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            },
            x: {
              duration: orb.driftDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.driftDelay,
            },
            y: {
              duration: orb.driftDuration + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.driftDelay + 0.2,
            },
          }}
        />
      ))}
    </motion.div>
  );
}

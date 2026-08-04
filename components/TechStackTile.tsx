"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TechStackItem } from "@/lib/tech-stack";

type TechStackTileProps = {
  item: TechStackItem;
};

export function TechStackTile({ item }: TechStackTileProps) {
  const { name, Icon, blurb } = item;
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.52, ease: [0.33, 1, 0.68, 1] },
        },
      }}
      whileHover={
        reduce
          ? {}
          : {
              y: -4,
              scale: 1.03,
              transition: { type: "spring", stiffness: 420, damping: 26 },
            }
      }
      whileTap={reduce ? {} : { scale: 0.99 }}
      className="group/tile relative min-w-0"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/12 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover/tile:opacity-100 dark:from-primary-400/18" />
      <div className="relative flex min-w-0 items-center gap-3.5 rounded-xl border border-slate-200/60 bg-white/90 px-4 py-3.5 shadow-sm transition-[border-color,box-shadow] duration-300 group-hover/tile:border-primary-500/20 group-hover/tile:shadow-md dark:border-slate-700/50 dark:bg-slate-900/40 dark:group-hover/tile:border-primary-400/25 dark:group-hover/tile:shadow-lg dark:group-hover/tile:shadow-black/25">
        <motion.span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          whileHover={reduce ? {} : { rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.45 }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </motion.span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
          {name}
        </span>
      </div>
      {/* Tooltip stays within tile width — avoids left-1/2 + w-max viewport spill */}
      <div
        role="tooltip"
        className="pointer-events-none absolute inset-x-0 bottom-full z-20 mb-2 translate-y-1 rounded-lg border border-slate-200/80 bg-white/95 px-3 py-2 text-xs leading-snug text-pretty text-slate-600 opacity-0 shadow-lg shadow-slate-900/10 backdrop-blur-sm transition-[opacity,transform] duration-200 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 dark:border-slate-600/80 dark:bg-slate-900/95 dark:text-slate-300 dark:shadow-black/40"
      >
        {blurb}
        <span
          className="absolute top-full left-4 -mt-px h-2 w-2 rotate-45 border border-slate-200/80 border-t-0 border-l-0 bg-white/95 dark:border-slate-600/80 dark:bg-slate-900/95"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

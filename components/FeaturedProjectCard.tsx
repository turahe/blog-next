"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import { useLocale } from "@/contexts/LocaleProvider";
import type { FeaturedProject } from "@/lib/featured-projects";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const gradientMap: Record<
  FeaturedProject["gradient"],
  { bar: string; overlay: string }
> = {
  violet: {
    bar: "from-violet-500 to-fuchsia-500",
    overlay: "from-violet-600/50 via-fuchsia-500/25 to-transparent",
  },
  emerald: {
    bar: "from-emerald-500 to-teal-500",
    overlay: "from-emerald-600/45 via-teal-500/20 to-transparent",
  },
  amber: {
    bar: "from-amber-400 to-orange-500",
    overlay: "from-amber-500/45 via-orange-500/25 to-transparent",
  },
  sky: {
    bar: "from-sky-400 to-blue-500",
    overlay: "from-sky-600/45 via-blue-600/22 to-transparent",
  },
  fuchsia: {
    bar: "from-fuchsia-500 to-purple-500",
    overlay: "from-fuchsia-600/50 via-purple-600/25 to-transparent",
  },
};

function isExternal(href: string) {
  return href.startsWith("http");
}

type FeaturedProjectCardProps = {
  project: FeaturedProject;
};

function cardVariants(reduce: boolean): Variants {
  if (reduce) {
    return { rest: {}, hover: {} };
  }
  return {
    rest: { y: 0, rotate: 0 },
    hover: {
      y: -6,
      rotate: -0.35,
      transition: { type: "spring", stiffness: 380, damping: 28 },
    },
  };
}

const mediaVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.088,
    transition: { duration: 0.58, ease: premiumEase },
  },
};

const dimVariants: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.42, ease: [0.33, 1, 0.68, 1] },
  },
};

const captionVariants: Variants = {
  rest: { opacity: 0, y: 14 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: premiumEase, delay: 0.04 },
  },
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const { t } = useLocale();
  const { title, description, href, tech, gradient, imageSrc, imageAlt } = project;
  const g = gradientMap[gradient];
  const external = isExternal(href);
  const reduceMotion = useReducedMotion() === true;

  const inner = (
    <motion.article
      variants={cardVariants(reduceMotion)}
      initial="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      animate="rest"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-sm shadow-slate-900/[0.06] transition-[border-color,box-shadow] duration-300 hover:border-primary-500/25 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-700/45 dark:bg-slate-900/50 dark:shadow-black/35 dark:hover:border-primary-400/20 dark:hover:shadow-2xl dark:hover:shadow-black/40"
    >
      <div
        className={`h-0.5 w-full shrink-0 bg-gradient-to-r ${g.bar} opacity-90`}
        aria-hidden
      />
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        <motion.div variants={mediaVariants} className="absolute inset-0 will-change-transform">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${g.overlay} mix-blend-multiply opacity-90 transition-opacity duration-500 group-hover:opacity-[0.72] dark:opacity-75 dark:mix-blend-soft-light dark:group-hover:opacity-55`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/5 to-transparent transition-opacity duration-500 group-hover:opacity-80"
          aria-hidden
        />
        <motion.div
          variants={dimVariants}
          className="pointer-events-none absolute inset-0 bg-slate-950/40 backdrop-blur-[0.5px] dark:bg-slate-950/55"
          aria-hidden
        />
        <motion.div
          variants={captionVariants}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center"
        >
          <span className="text-balance text-base font-semibold tracking-tight text-white drop-shadow-md">
            {title}
          </span>
          <span className="text-sm font-medium text-white/88">
            {external ? t("work.viewInNewTab") : t("work.viewProject")}
          </span>
        </motion.div>
      </div>
      <div className="relative flex flex-1 flex-col gap-2.5 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium tracking-tight text-pretty text-slate-900 dark:text-slate-50">
            {title}
          </h3>
          <FiArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-600 dark:text-slate-500 dark:group-hover:text-primary-400"
            aria-hidden
          />
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-slate-200/80 bg-slate-50/90 px-2 py-0.5 text-xs font-normal text-slate-600 dark:border-slate-600/70 dark:bg-slate-800/60 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );

  const ring =
    "block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-primary-400/60 dark:focus-visible:ring-offset-slate-900";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={ring}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={ring}>
      {inner}
    </Link>
  );
}

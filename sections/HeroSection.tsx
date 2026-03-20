"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { MotionPrimaryLink } from "@/components/MicroMotionLinks";
import {
  fadeInUp,
  fadeInUpBlur,
  staggerContainer,
} from "@/lib/motion-variants";
import { siteMetadata } from "@/lib/site-metadata";
import { useLocale } from "@/contexts/LocaleProvider";

export function HeroSection() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  /* Parallax: foreground moves faster than hero background layers (HeroBackdrop). */
  const contentY = useTransform(scrollYProgress, (p) => (reduce ? 0 : -p * 36));

  const resumeHref = siteMetadata.resumeUrl;
  const primaryBtn =
    "inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/25 ring-1 ring-white/10 transition-colors hover:from-slate-700 hover:to-slate-800 dark:from-slate-100 dark:to-slate-200 dark:text-slate-900 dark:shadow-lg dark:shadow-black/20 dark:ring-slate-900/10 dark:hover:from-white dark:hover:to-slate-100";
  const secondaryBtn =
    "inline-flex items-center justify-center rounded-lg border border-slate-200/90 bg-white/70 px-6 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800";

  const h1Variants = reduce ? fadeInUp : fadeInUpBlur;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-slate-200/40 dark:border-slate-800/60"
      aria-labelledby="hero-heading"
    >
      <HeroBackdrop scrollYProgress={scrollYProgress} />
      <div className="section-wrap relative py-28 sm:py-32 md:py-40">
        <motion.div className="max-w-2xl" style={{ y: contentY }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
              <motion.span
                className="h-px bg-gradient-to-r from-primary-500/80 to-transparent dark:from-primary-400/60"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              />
              <span className="section-label">{t("hero.portfolio")}</span>
            </motion.div>
            <motion.h1
              id="hero-heading"
              variants={h1Variants}
              className="text-pretty text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl md:text-[3.35rem] md:leading-[1.08] dark:text-slate-50"
            >
              {siteMetadata.author}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-xl text-lg font-normal text-slate-500 sm:text-xl dark:text-slate-400"
            >
              {t("hero.jobTitle")}
            </motion.p>
            <motion.p variants={fadeInUp} className="section-lead mt-8 max-w-xl">
              {t("hero.heroDescription")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start sm:gap-5"
            >
              <MotionPrimaryLink href={resumeHref} className={primaryBtn}>
                {t("hero.hireMe")}
              </MotionPrimaryLink>
              <MotionPrimaryLink href="/projects" className={secondaryBtn}>
                {t("hero.viewProjects")}
              </MotionPrimaryLink>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="mt-14 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500"
            >
              <kbd className="rounded border border-slate-200 bg-slate-100/80 px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                ⌘
              </kbd>
              <span>+</span>
              <kbd className="rounded border border-slate-200 bg-slate-100/80 px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                K
              </kbd>
              <span className="ml-1">{t("hero.commandPalette")}</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

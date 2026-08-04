"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLocale } from "@/contexts/LocaleProvider";
import { homeVisuals } from "@/lib/home-visuals";
import {
  fadeInUp,
  premiumEase,
  revealViewport,
  staggerSection,
} from "@/lib/motion-variants";
import { siteMetadata } from "@/lib/site-metadata";

export function AboutSection() {
  const { t } = useLocale();
  const portraitSrc = homeVisuals.about.src;

  return (
    <section
      id="about"
      className="relative overflow-x-clip py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="section-wrap">
        <motion.div
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(100%,280px)] lg:items-start lg:gap-20"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <div>
            <motion.p variants={fadeInUp} className="section-label">
              {t("about.label")}
            </motion.p>
            <div className="relative mt-2 inline-block max-w-full">
              <motion.h2
                id="about-heading"
                variants={fadeInUp}
                className="section-title pr-1"
              >
                {t("about.title")}
              </motion.h2>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-primary-500 via-violet-500 to-primary-500/60 origin-left dark:from-primary-400 dark:via-violet-400 dark:to-primary-400/50"
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, ease: premiumEase }}
              />
            </div>
            <motion.div
              variants={fadeInUp}
              className="mt-8 max-w-xl space-y-5 type-lead text-muted-foreground sm:mt-10"
            >
              <p>
                {t("about.p1", {
                  author: siteMetadata.author,
                  jobTitle: t("hero.jobTitle"),
                  tagline: t("about.tagline"),
                  care: t("about.p1Care"),
                })}
              </p>
              <p>{t("about.p2")}</p>
              <p>
                <Link
                  href="/about"
                  className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("about.readMore")}
                </Link>
              </p>
            </motion.div>
          </div>
          <motion.div
            variants={fadeInUp}
            className="flex justify-center lg:justify-end lg:pt-1"
          >
            <motion.div
              className="relative"
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              initial={{ scale: 0.94, rotate: -3, opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="relative max-w-64 overflow-x-clip">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary-500/20 via-transparent to-violet-500/15 blur-xl dark:from-primary-500/12 dark:to-violet-500/10"
                  aria-hidden
                />
                <Image
                  src={portraitSrc}
                  alt={t("about.profileAlt", { author: siteMetadata.author })}
                  width={280}
                  height={350}
                  className="relative aspect-[4/5] w-full rounded-2xl border border-border bg-card object-cover"
                  unoptimized={portraitSrc.endsWith(".svg")}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

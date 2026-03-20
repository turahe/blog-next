"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { homeVisuals } from "@/lib/home-visuals";
import { fadeInUp, premiumEase, revealViewport, staggerSection } from "@/lib/motion-variants";
import { siteMetadata } from "@/lib/site-metadata";

export function AboutSection() {
  const profileAlt = `Portrait — ${siteMetadata.author}`;

  return (
    <section id="about" className="py-24 md:py-32" aria-labelledby="about-heading">
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
              About
            </motion.p>
            <div className="relative mt-2 inline-block max-w-full">
              <motion.h2
                id="about-heading"
                variants={fadeInUp}
                className="section-title pr-1"
              >
                Clear thinking, shipped software
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
              className="mt-8 max-w-xl space-y-5 text-[0.9375rem] leading-[1.65] text-slate-600 sm:mt-10 dark:text-slate-400"
            >
              <p>
                I&apos;m{" "}
                <strong className="font-medium text-slate-800 dark:text-slate-100">{siteMetadata.author}</strong>
                — {siteMetadata.jobTitle}. {siteMetadata.description} I care about readable code,
                resilient architecture, and interfaces that respect the reader&apos;s time.
              </p>
              <p>
                When I&apos;m not writing or building, I&apos;m usually digging into performance,
                developer experience, or the quiet details that make a product feel trustworthy.
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
              <div
                className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary-500/20 via-transparent to-violet-500/15 blur-xl dark:from-primary-500/12 dark:to-violet-500/10"
                aria-hidden
              />
              
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { TechStackTile } from "@/components/TechStackTile";
import {
  fadeInUp,
  revealViewport,
  staggerGrid,
  staggerSection,
} from "@/lib/motion-variants";
import { techStack } from "@/lib/tech-stack";

export function TechStackSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32" aria-labelledby="skills-heading">
      <div
        className="pointer-events-none absolute left-[max(-12%,-80px)] top-1/4 h-64 w-64 rounded-full bg-primary-500/[0.06] blur-3xl dark:bg-primary-400/[0.05]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 right-[-40px] h-48 w-48 text-primary-500/15 dark:text-primary-400/10"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M44 160C88 120 120 88 160 44"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M64 170C108 130 132 98 176 54"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="section-wrap relative">
        <motion.div
          className="max-w-xl"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.p variants={fadeInUp} className="section-label">
            Toolkit
          </motion.p>
          <motion.h2 id="skills-heading" variants={fadeInUp} className="section-title mt-2">
            Tech I ship with
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-lead">
            A focused stack for modern products — pragmatic choices, consistent patterns, and room
            to evolve.
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {techStack.map((item) => (
            <TechStackTile key={item.name} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

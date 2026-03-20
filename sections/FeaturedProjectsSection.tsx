"use client";

import { motion } from "motion/react";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import {
  cardReveal,
  fadeInUp,
  revealViewport,
  staggerGrid,
  staggerSection,
} from "@/lib/motion-variants";
import { featuredProjects } from "@/lib/featured-projects";

export function FeaturedProjectsSection() {
  return (
    <section id="work" className="py-24 md:py-32" aria-labelledby="work-heading">
      <div className="section-wrap">
        <motion.div
          className="max-w-xl"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.p variants={fadeInUp} className="section-label">
            Featured
          </motion.p>
          <motion.h2 id="work-heading" variants={fadeInUp} className="section-title mt-2">
            Selected work
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-lead">
            Highlights from products, content, and experiments — each with a clear goal and a
            thoughtful technical story.
          </motion.p>
        </motion.div>
        <motion.ul
          className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {featuredProjects.map((project) => (
            <motion.li key={project.title} variants={cardReveal} className="h-full min-h-0">
              <FeaturedProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

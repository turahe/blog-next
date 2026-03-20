"use client";

import { motion, useReducedMotion } from "motion/react";
import { MotionArrowLink, MotionTextLink } from "@/components/MicroMotionLinks";
import { TagChip } from "@/components/TagChip";
import { postExcerpt } from "@/lib/excerpt";
import { formatDate } from "@/lib/format-date";
import { getReadingTimeMinutes } from "@/lib/reading-time";
import {
  fadeInUp,
  revealViewport,
  staggerGrid,
  staggerItem,
  staggerSection,
} from "@/lib/motion-variants";
import { useLocale } from "@/contexts/LocaleProvider";
import type { Post } from "@/types/post";

type LatestWritingSectionProps = {
  posts: Post[];
  maxDisplay: number;
};

function postHref(post: Post): string {
  return post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
}

export function LatestWritingSection({ posts, maxDisplay }: LatestWritingSectionProps) {
  const { t, dateLocale } = useLocale();
  const reduce = useReducedMotion();
  const slice = posts.slice(0, maxDisplay);

  return (
    <section id="writing" className="py-24 md:py-32" aria-labelledby="writing-heading">
      <div className="section-wrap">
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <div>
            <motion.p variants={fadeInUp} className="section-label">
              {t("writing.label")}
            </motion.p>
            <motion.h2 id="writing-heading" variants={fadeInUp} className="section-title mt-2">
              {t("writing.title")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-lead">
              {t("writing.lead")}
            </motion.p>
          </div>
          {posts.length > maxDisplay ? (
            <motion.div variants={fadeInUp} className="shrink-0">
              <MotionArrowLink
                href="/posts"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t("writing.allPosts")}
              </MotionArrowLink>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.ul
          className="mt-16 space-y-12"
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {!slice.length ? (
            <motion.li variants={staggerItem} className="py-10 text-sm text-slate-500 dark:text-slate-400">
              {t("writing.noPosts")}
            </motion.li>
          ) : null}
          {slice.map((post) => {
            const date = post.createdAt ?? "";
            const summary = postExcerpt(post.content);
            const href = postHref(post);

            return (
              <motion.li key={post.id} variants={staggerItem}>
                <motion.article
                  className="group -mx-4 rounded-2xl px-4 py-2 transition-colors hover:bg-slate-50/90 dark:hover:bg-slate-800/35"
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                    <dl className="shrink-0 space-y-1 lg:w-36">
                      <dt className="sr-only">{t("writing.publishedOn")}</dt>
                      <dd className="text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
                        <time dateTime={date}>{formatDate(date, dateLocale)}</time>
                      </dd>
                      <dt className="sr-only">{t("writing.readingTime")}</dt>
                      <dd className="text-xs text-slate-400 dark:text-slate-500">
                        {t("writing.minRead", {
                          minutes: getReadingTimeMinutes(post.content),
                        })}
                      </dd>
                    </dl>
                    <div className="min-w-0 flex-1 space-y-3">
                      <h3 className="text-lg font-medium tracking-tight text-pretty text-slate-900 sm:text-xl dark:text-slate-50">
                        <MotionTextLink
                          href={href}
                          className="text-inherit transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300"
                        >
                          {post.title}
                        </MotionTextLink>
                      </h3>
                      {post.tags?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <TagChip key={tag.id} tag={tag} />
                          ))}
                        </div>
                      ) : null}
                      <p className="max-w-2xl text-[0.9375rem] leading-[1.65] text-slate-600 dark:text-slate-400">
                        {summary}
                      </p>
                      <div>
                        <MotionArrowLink
                          href={href}
                          className="text-sm font-medium text-slate-700 group-hover:text-primary-600 dark:text-slate-300 dark:group-hover:text-primary-300"
                          aria-label={t("writing.readAria", { title: post.title })}
                        >
                          {t("writing.readMore")}
                        </MotionArrowLink>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

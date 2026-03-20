"use client";

import { useCallback, type FormEvent } from "react";
import { motion } from "motion/react";
import { MotionButton, MotionTextLink } from "@/components/MicroMotionLinks";
import { fadeInUp, revealViewport, staggerGrid, staggerSection } from "@/lib/motion-variants";
import { siteMetadata } from "@/lib/site-metadata";
import { useLocale } from "@/contexts/LocaleProvider";

export function ContactSection() {
  const { t } = useLocale();
  const email = siteMetadata.contactEmail?.trim();
  const github = siteMetadata.githubUrl;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name =
        String(fd.get("name") ?? "").trim() || t("contact.defaultName");
      const message = String(fd.get("message") ?? "").trim();
      if (!email) {
        window.open(github, "_blank", "noopener,noreferrer");
        return;
      }
      const subject = encodeURIComponent(t("contact.mailSubject", { name }));
      const body = encodeURIComponent(message || `Hi ${siteMetadata.author.split(" ")[0]},\n\n`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    },
    [email, github, t],
  );

  return (
    <section id="contact" className="py-24 md:py-32" aria-labelledby="contact-heading">
      <div className="section-wrap">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16"
          variants={staggerSection}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <div>
            <motion.p variants={fadeInUp} className="section-label">
              {t("contact.label")}
            </motion.p>
            <motion.h2 id="contact-heading" variants={fadeInUp} className="section-title mt-2">
              {t("contact.title")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-lead">
              {t("contact.lead")}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {email ? (
                <MotionTextLink
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500 dark:text-slate-200 dark:decoration-slate-600 dark:hover:decoration-slate-400"
                  external
                >
                  {email}
                </MotionTextLink>
              ) : null}
              <MotionTextLink
                href={github}
                className="text-sm font-normal text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
                external
              >
                {t("footer.github")}
              </MotionTextLink>
              <MotionTextLink
                href={siteMetadata.resumeUrl}
                className="text-sm font-normal text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
                external
              >
                {t("contact.resume")}
              </MotionTextLink>
            </motion.div>
          </div>
          <motion.form
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            onSubmit={onSubmit}
            className="space-y-1 md:pt-1"
          >
            <motion.div variants={fadeInUp}>
              <label htmlFor="contact-name" className="sr-only">
                {t("contact.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("contact.placeholderName")}
                className="w-full border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500/60 focus:ring-0 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary-400/50"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="contact-message" className="sr-only">
                {t("contact.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder={t("contact.placeholderMessage")}
                className="w-full resize-none border-0 border-b border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-500/60 focus:ring-0 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary-400/50"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="pt-5">
              <MotionButton
                type="submit"
                className="w-full rounded-md bg-slate-900 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {email ? t("contact.sendMessage") : t("contact.openGithub")}
              </MotionButton>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 380, damping: 26, mass: 0.8 };

function useMicroInteraction() {
  const reduce = useReducedMotion();
  return {
    hover: reduce
      ? {}
      : { scale: 1.035, rotate: -0.75, transition: spring },
    tap: reduce ? {} : { scale: 0.985, rotate: 0, transition: { duration: 0.15 } },
  };
}

type PrimaryCTAProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Primary / ghost CTA: scale + slight CCW rotate on hover (respects reduced motion). */
export function MotionPrimaryLink({ href, className = "", children }: PrimaryCTAProps) {
  const { hover, tap } = useMicroInteraction();
  const external = /^https?:\/\//i.test(href) || href.startsWith("mailto:");

  if (external) {
    const isHttp = /^https?:\/\//i.test(href);
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={hover}
        whileTap={tap}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.span className="inline-flex" whileHover={hover} whileTap={tap}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.span>
  );
}

type MotionTextLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

/** Lighter motion for inline text links */
export function MotionTextLink({
  href,
  className = "",
  children,
  external,
}: MotionTextLinkProps) {
  const reduce = useReducedMotion();
  const hover = reduce ? {} : { scale: 1.02, y: -1 };
  const tap = reduce ? {} : { scale: 0.99 };
  const isExternal =
    external ?? (/^https?:\/\//i.test(href) || href.startsWith("mailto:"));

  if (isExternal) {
    const isHttp = /^https?:\/\//i.test(href);
    return (
      <motion.a
        href={href}
        className={`inline-flex ${className}`}
        whileHover={hover}
        whileTap={tap}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.span className="inline-flex" whileHover={hover} whileTap={tap}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.span>
  );
}

type MotionArrowLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  "aria-label"?: string;
};

/** Inline link with arrow that nudges on hover (matches featured project cards). */
export function MotionArrowLink({
  href,
  className = "",
  children,
  external,
  "aria-label": ariaLabel,
}: MotionArrowLinkProps) {
  const reduce = useReducedMotion();
  const isExternal =
    external ?? (/^https?:\/\//i.test(href) || href.startsWith("mailto:"));
  const Icon = isExternal ? FiArrowUpRight : FiArrowRight;
  const drift = reduce ? {} : { x: 3 };
  const tap = reduce ? {} : { x: 0 };

  const iconClasses = [
    "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-primary-600 dark:text-slate-500 dark:group-hover:text-primary-400",
    isExternal
      ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      : "group-hover:translate-x-1",
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <Icon className={iconClasses} aria-hidden />
    </>
  );

  const linkClass = `group inline-flex items-center gap-1.5 ${className}`;

  if (isExternal) {
    const isHttp = /^https?:\/\//i.test(href);
    return (
      <motion.a
        href={href}
        className={linkClass}
        whileHover={drift}
        whileTap={tap}
        aria-label={ariaLabel}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.span className="inline-flex" whileHover={drift} whileTap={tap}>
      <Link href={href} className={linkClass} aria-label={ariaLabel}>
        {inner}
      </Link>
    </motion.span>
  );
}

type MotionButtonProps = {
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
};

export function MotionButton({
  type = "button",
  className = "",
  children,
}: MotionButtonProps) {
  const { hover, tap } = useMicroInteraction();
  return (
    <motion.button type={type} className={className} whileHover={hover} whileTap={tap}>
      {children}
    </motion.button>
  );
}

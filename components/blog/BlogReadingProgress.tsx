"use client";

import { useEffect, useState } from "react";

/**
 * Thin reading progress bar under the site header.
 * Hidden when prefers-reduced-motion is set (progress still unnecessary).
 */
export function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-primary transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

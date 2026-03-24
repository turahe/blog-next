"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BlogTocHeading } from "@/lib/blog-content";

/** Viewport threshold aligned with sticky page chrome (~top-24 + offset). */
const SECTION_ACTIVATION_TOP_PX = 104;

type BlogTocContextValue = {
  activeId: string | null;
  scrollToHeading: (id: string, options?: { onDone?: () => void }) => void;
};

const BlogTocContext = createContext<BlogTocContextValue | null>(null);

export function useBlogToc(): BlogTocContextValue {
  const ctx = useContext(BlogTocContext);
  if (!ctx) {
    throw new Error("useBlogToc must be used within BlogTocProvider");
  }
  return ctx;
}

function useBlogTocActiveId(headings: BlogTocHeading[]): BlogTocContextValue {
  const [activeId, setActiveId] = useState<string | null>(() => headings[0]?.id ?? null);

  /* Deep link: #heading-id */
  useEffect(() => {
    const list = headings;
    if (list.length === 0 || typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash || !list.some((h) => h.id === hash)) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const smooth =
        typeof window !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      setActiveId(hash);
    });
  }, [headings]);

  useEffect(() => {
    const list = headings;
    if (list.length === 0) return;

    const computeActive = () => {
      let current = list[0]!.id;
      for (const h of list) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= SECTION_ACTIVATION_TOP_PX) current = h.id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    computeActive();
    let raf = 0;
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headings]);

  const scrollToHeading = useCallback((id: string, options?: { onDone?: () => void }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const smooth =
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
    setActiveId(id);
    options?.onDone?.();
  }, []);

  const resolvedActiveId = headings.length === 0 ? null : activeId;

  return { activeId: resolvedActiveId, scrollToHeading };
}

export function BlogTocProvider({
  headings,
  children,
}: {
  headings: BlogTocHeading[];
  children: ReactNode;
}) {
  const value = useBlogTocActiveId(headings);
  return <BlogTocContext.Provider value={value}>{children}</BlogTocContext.Provider>;
}

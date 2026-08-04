import { siteMetadata } from "@/lib/site-metadata";
import type { Experience } from "@/lib/api/types";

export type AboutTimelineItem = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
};

export type AboutPrinciple = {
  title: string;
  body: string;
};

/**
 * Static About page content — used when the profile API is unavailable.
 * Keep copy editorial and factual; do not invent credentials.
 */
export const aboutContent = {
  name: siteMetadata.author,
  headline: siteMetadata.jobTitle,
  summary:
    "Software engineer focused on backend systems, web applications, architecture, and developer tooling. I care about readable code, resilient services, and interfaces that respect the reader's time.",
  location: "Indonesia",
  portraitSrc:
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_PROFILE_IMAGE) ||
    "/images/about-portrait.svg",
  philosophy: [
    "Prefer simple systems that can evolve over premature abstraction.",
    "Content and contracts first — visuals and motion enhance, they never replace meaning.",
    "Optimize for clarity: naming, boundaries, and operational honesty in production.",
  ],
  interests: [
    "Backend architecture & APIs",
    "Frontend craft with Next.js",
    "Developer experience & tooling",
    "Performance and Core Web Vitals",
    "Technical writing",
    "Open source collaboration",
  ],
  principles: [
    {
      title: "Content over chrome",
      body: "Important information lives in semantic HTML. Animation never becomes the only carrier of meaning.",
    },
    {
      title: "Ship trustworthy defaults",
      body: "Caching, timeouts, and failure modes are design decisions — not afterthoughts.",
    },
    {
      title: "Small surfaces, clear ownership",
      body: "Prefer focused modules and Server Components by default. Client JavaScript stays intentional.",
    },
    {
      title: "Write for the next reader",
      body: "Code and articles should be legible to future teammates — including yourself in six months.",
    },
  ] satisfies AboutPrinciple[],
  /** Fallback career timeline when `/experience` is empty. */
  timeline: [
    {
      id: "current",
      company: "Independent / open source",
      role: "Software engineer",
      description:
        "Building portfolio systems, blog infrastructure, and tooling with Next.js, TypeScript, and pragmatic backends.",
      startDate: "2020",
      technologies: ["Go", "TypeScript", "Next.js", "PostgreSQL"],
    },
  ] satisfies AboutTimelineItem[],
} as const;

export function mapExperienceToTimeline(
  items: Experience[],
): AboutTimelineItem[] {
  return items.map((item) => ({
    id: item.id,
    company: item.company,
    role: item.role,
    description: item.description,
    startDate: item.startDate,
    endDate: item.endDate,
    technologies: item.technologies,
  }));
}

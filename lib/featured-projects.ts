export type FeaturedProject = {
  title: string;
  description: string;
  href: string;
  tech: string[];
  /** Tailwind gradient from-* / to-* token suffixes (overlay tint on thumbnails) */
  gradient: "violet" | "emerald" | "amber" | "sky" | "fuchsia";
  /** Optimized thumbnail — served via next/image */
  imageSrc: string;
  imageAlt: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Go Blog",
    description:
      "A fast, content-focused blog frontend with App Router, typed posts, and a polished reading experience.",
    href: "/posts",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    gradient: "violet",
    imageSrc: "/images/featured-go-blog.svg",
    imageAlt: "Abstract gradient — product engineering",
  },
  {
    title: "Engineering Notes",
    description:
      "Long-form writing on architecture, performance, and the craft of building software that lasts.",
    href: "/posts",
    tech: ["MDX", "React", "Vercel"],
    gradient: "emerald",
    imageSrc: "/images/featured-notes.svg",
    imageAlt: "Abstract gradient — writing and deep work",
  },
  {
    title: "Open Source",
    description:
      "Experiments, tooling, and libraries I maintain or contribute to — see the full picture on GitHub.",
    href: "https://github.com/turahe",
    tech: ["Go", "Node", "GitHub Actions"],
    gradient: "sky",
    imageSrc: "/images/featured-opensource.svg",
    imageAlt: "Abstract gradient — collaboration",
  },
];

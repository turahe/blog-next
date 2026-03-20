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
    imageSrc:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Code editor on a monitor — product engineering",
  },
  {
    title: "Engineering Notes",
    description:
      "Long-form writing on architecture, performance, and the craft of building software that lasts.",
    href: "/posts",
    tech: ["MDX", "React", "Vercel"],
    gradient: "emerald",
    imageSrc:
      "https://images.unsplash.com/photo-1455399411563-4023049a0fa5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Notebook and laptop — writing and deep work",
  },
  {
    title: "Open Source",
    description:
      "Experiments, tooling, and libraries I maintain or contribute to — see the full picture on GitHub.",
    href: "https://github.com/turahe",
    tech: ["Go", "Node", "GitHub Actions"],
    gradient: "sky",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Developers collaborating at a shared screen",
  },
];

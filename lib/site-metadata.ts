/** Site-wide copy and defaults (homepage, SEO helpers). */
export const siteMetadata = {
  title: "Go Blog",
  /** Default meta description, Open Graph, Twitter */
  metaDescription: "A clean, fast blog frontend powered by Next.js",
  description:
    "Notes on engineering, architecture, and product building — ",
  /** Homepage hero one-liner (complements `description` for long-form lists). */
  heroDescription:
    "I design and build reliable web products — from crisp frontends to pragmatic backends — with a focus on clarity, performance, and maintainable systems.",
  jobTitle: "Software engineer & builder",
  /** Used for date formatting on the homepage list */
  locale: "en-US",
  author: "Nur Wachid",
  /** Public email for contact CTAs (optional). Set via env for production. */
  contactEmail:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "",
  resumeUrl:
    "https://github.com/turahe/cv-latex/releases/download/v1.0.1/CV_Nur_Wachid.pdf",
  githubUrl: "https://github.com/turahe",
  newsletter: undefined as
    | {
        provider?: string;
      }
    | undefined,

  /** Lines cycled in the homepage hero typewriter (see HeroGreetingTypewriter). */
  about: [
    "I'm a Nur Wachid",
    "I'm a software engineer",
    "I'm a writer and a thinker.",
    "I'm a learner",
    "I'm a developer and a designer.",
    "I'm a problem solver and a creative thinker.",
    "I'm a leader and a follower.",
  ] as const satisfies readonly string[],
};

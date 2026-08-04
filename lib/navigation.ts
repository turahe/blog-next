import { siteMetadata } from "@/lib/site-metadata";

export type PrimaryNavItem = {
  href: string;
  /** i18n key under `nav.*` */
  labelKey: "about" | "projects" | "blog" | "resume" | "contact";
  external?: boolean;
};

/**
 * Primary site navigation — DESIGN.md §9.
 * Keep this list short; secondary destinations belong in the command palette / menu.
 */
export const primaryNav: readonly PrimaryNavItem[] = [
  { href: "/about", labelKey: "about" },
  { href: "/projects", labelKey: "projects" },
  { href: "/posts", labelKey: "blog" },
  { href: siteMetadata.resumeUrl, labelKey: "resume", external: true },
  { href: "/#contact", labelKey: "contact" },
] as const;

/** Destinations for the command palette (broader than primary nav). */
export function getCommandNavPages(t: (key: string) => string) {
  return {
    pages: [
      { name: t("cmd.home"), href: "/", repo: "/" },
      { name: t("cmd.about"), href: "/about", repo: "/about" },
      { name: t("cmd.blog"), href: "/posts", repo: t("cmd.allPosts") },
      { name: t("cmd.tags"), href: "/tags", repo: "/tags" },
      { name: t("cmd.projects"), href: "/projects", repo: "/projects" },
    ],
  };
}

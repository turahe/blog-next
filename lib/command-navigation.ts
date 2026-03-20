export type CommandPage = {
  name: string;
  href: string;
  /** Secondary line (path, slug, or short note) */
  repo?: string;
};

export type CommandNavigation = {
  pages: CommandPage[];
};

/** Pages surfaced in the header command palette (⌘/Ctrl+K). */
export const commandNavigation: CommandNavigation = {
  pages: [
    { name: "Home", href: "/", repo: "/" },
    { name: "Blog", href: "/posts", repo: "All posts" },
    { name: "Tags", href: "/tags", repo: "/tags" },
    { name: "Projects", href: "/projects", repo: "/projects" },
  ],
};

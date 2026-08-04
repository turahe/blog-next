/**
 * Design token references for TypeScript consumers.
 * Visual values live in `app/globals.css` (DESIGN.md + shadcn contract).
 */
export const designTokens = {
  color: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    muted: "var(--muted)",
    mutedForeground: "var(--muted-foreground)",
    surface: "var(--card)",
    border: "var(--border)",
    primary: "var(--primary)",
    accent: "var(--accent)",
  },
  font: {
    display: "font-display",
    body: "font-sans",
    code: "font-mono",
  },
  typography: {
    display: "text-display-lg leading-display tracking-display",
    h1: "text-display leading-display tracking-display",
    h2: "text-heading-lg leading-heading tracking-heading",
    h3: "text-heading leading-heading tracking-heading",
    bodyLg: "text-body-lg leading-body",
    body: "text-body leading-body",
    small: "text-small",
  },
  contentMaxWidth: "max-w-content",
  articleMaxWidth: "max-w-article",
  pagePaddingInline: "var(--page-padding-inline)",
  motion: {
    microMs: 200,
    sectionMs: 600,
  },
} as const;

/** Tailwind class helpers aligned to the design system. */
export const ds = {
  page: "bg-background text-foreground",
  surface: "bg-card text-card-foreground border-border",
  muted: "text-muted-foreground",
  accent: "text-primary",
  container: "mx-auto w-full max-w-content px-[var(--page-padding-inline)]",
  display:
    "font-display text-display-lg font-medium leading-display tracking-display text-balance text-foreground",
  h1: "font-display text-display font-medium leading-display tracking-display text-balance text-foreground",
  h2: "font-display text-heading-lg font-medium leading-heading tracking-heading text-pretty text-foreground",
  h3: "font-display text-heading font-medium leading-heading tracking-heading text-pretty text-foreground",
  lead: "font-sans text-body-lg font-normal leading-body text-muted-foreground text-pretty",
  body: "font-sans text-body font-normal leading-body text-foreground text-pretty",
  small: "font-sans text-small font-normal text-muted-foreground",
  label:
    "font-sans text-small font-normal uppercase tracking-[0.08em] text-muted-foreground",
} as const;

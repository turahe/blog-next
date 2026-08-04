import Link from "next/link";
import type { AdjacentPostLink } from "@/lib/post-relations";

type BlogPrevNextProps = {
  previous?: AdjacentPostLink;
  next?: AdjacentPostLink;
  previousLabel: string;
  nextLabel: string;
};

export function BlogPrevNext({
  previous,
  next,
  previousLabel,
  nextLabel,
}: BlogPrevNextProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Adjacent articles"
      className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group rounded-md border border-border p-4 transition hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-small text-muted-foreground">
            {previousLabel}
          </span>
          <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
            ← {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group rounded-md border border-border p-4 text-right transition hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:justify-self-end sm:text-right"
        >
          <span className="text-small text-muted-foreground">{nextLabel}</span>
          <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
            {next.title} →
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

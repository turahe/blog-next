import Link from "next/link";

interface PaginationControlsProps {
  nextCursor?: string;
  prevCursor?: string;
  pathname?: string;
  limit?: number;
  previousLabel?: string;
  nextLabel?: string;
  statusLabel?: string;
}

export function PaginationControls({
  nextCursor,
  prevCursor,
  pathname = "/",
  limit = 10,
  previousLabel = "← Previous",
  nextLabel = "Next →",
  statusLabel = "More posts",
}: PaginationControlsProps) {
  if (!nextCursor && !prevCursor) {
    return null;
  }

  const prevHref = prevCursor
    ? `${pathname}?cursor=${encodeURIComponent(prevCursor)}&dir=prev&limit=${limit}`
    : pathname;
  const nextHref = nextCursor
    ? `${pathname}?cursor=${encodeURIComponent(nextCursor)}&dir=next&limit=${limit}`
    : pathname;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between border-t border-border pt-6"
    >
      <Link
        href={prevHref}
        aria-disabled={!prevCursor}
        tabIndex={prevCursor ? undefined : -1}
        className={
          !prevCursor
            ? "pointer-events-none text-small text-muted-foreground/40"
            : "text-small font-medium text-foreground transition hover:text-primary"
        }
      >
        {previousLabel}
      </Link>
      <span className="text-small text-muted-foreground">{statusLabel}</span>
      <Link
        href={nextHref}
        aria-disabled={!nextCursor}
        tabIndex={nextCursor ? undefined : -1}
        className={
          !nextCursor
            ? "pointer-events-none text-small text-muted-foreground/40"
            : "text-small font-medium text-foreground transition hover:text-primary"
        }
      >
        {nextLabel}
      </Link>
    </nav>
  );
}

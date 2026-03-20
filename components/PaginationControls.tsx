import Link from "next/link";

interface PaginationControlsProps {
  nextCursor?: string;
  prevCursor?: string;
  pathname?: string;
  limit?: number;
}

export function PaginationControls({
  nextCursor,
  prevCursor,
  pathname = "/",
  limit = 10,
}: PaginationControlsProps) {
  const prevHref = prevCursor
    ? `${pathname}?cursor=${encodeURIComponent(prevCursor)}&dir=prev&limit=${limit}`
    : pathname;
  const nextHref = nextCursor
    ? `${pathname}?cursor=${encodeURIComponent(nextCursor)}&dir=next&limit=${limit}`
    : pathname;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
      <Link
        href={prevHref}
        aria-disabled={!prevCursor}
        className={`text-sm font-semibold transition ${
          !prevCursor
            ? "pointer-events-none text-slate-300 dark:text-slate-700"
            : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        }`}
      >
        {"<- Previous"}
      </Link>
      <span className="text-sm text-slate-500 dark:text-slate-400">More posts</span>
      <Link
        href={nextHref}
        aria-disabled={!nextCursor}
        className={`text-sm font-semibold transition ${
          !nextCursor
            ? "pointer-events-none text-slate-300 dark:text-slate-700"
            : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        }`}
      >
        {"Next ->"}
      </Link>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div
      className="animate-pulse border-b border-border py-10"
      aria-hidden
    >
      <div className="h-3 w-40 rounded bg-muted" />
      <div className="mt-4 h-7 w-2/3 max-w-md rounded bg-muted" />
      <div className="mt-4 h-4 w-full rounded bg-muted" />
      <div className="mt-2 h-4 w-4/5 rounded bg-muted" />
      <div className="mt-2 h-4 w-3/5 rounded bg-muted" />
    </div>
  );
}

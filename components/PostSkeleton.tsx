export function PostSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="h-6 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 h-4 w-full rounded bg-slate-200" />
      <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-3/5 rounded bg-slate-200" />
      <div className="mt-5 h-3 w-24 rounded bg-slate-200" />
    </div>
  );
}

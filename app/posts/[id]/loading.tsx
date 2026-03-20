export default function LoadingPostDetail() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="h-9 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-3 h-4 w-36 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-8 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-2 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </main>
  );
}

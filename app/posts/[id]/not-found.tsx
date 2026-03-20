import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-slate-200/90 bg-white p-8 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Post not found</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          The post you are looking for does not exist or was removed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

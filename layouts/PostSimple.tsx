import type { ReactNode } from "react";
import Link from "next/link";

import type { Post } from "@/types/post";
import { formatReadingTime } from "@/lib/reading-time";

interface PostNav {
  href: string;
  title: string;
}

interface PostSimpleProps {
  post: Post;
  publishedAt: string;
  editActions?: ReactNode;
  backHref?: string;
  prev?: PostNav;
  next?: PostNav;
  children: ReactNode;
}

export function PostSimple({
  post,
  publishedAt,
  editActions,
  backHref = "/",
  prev,
  next,
  children,
}: PostSimpleProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href={backHref}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Back to posts
        </Link>
      </div>

      <article>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {publishedAt}
          </time>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {formatReadingTime(post.content)}
          </span>
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          {post.title}
        </h1>
        {editActions ? <div className="mt-4">{editActions}</div> : null}

        <div className="mt-8">{children}</div>
      </article>

      {(prev || next) && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ← {prev.title}
            </Link>
          ) : null}
          {next ? (
            <Link
              href={next.href}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {next.title} →
            </Link>
          ) : null}
        </div>
      )}
    </main>
  );
}


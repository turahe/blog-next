import type { ReactNode } from "react";
import Link from "next/link";

import type { Post } from "@/types/post";
import { formatReadingTime } from "@/lib/reading-time";

interface PostBannerProps {
  post: Post;
  publishedAt: string;
  bannerImageUrl?: string;
  editActions?: ReactNode;
  backHref?: string;
  children: ReactNode;
}

export function PostBanner({
  post,
  publishedAt,
  bannerImageUrl,
  editActions,
  backHref = "/",
  children,
}: PostBannerProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href={backHref}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Back
        </Link>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {bannerImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bannerImageUrl}
            alt=""
            className="h-56 w-full rounded-t-2xl object-cover"
          />
        ) : null}

        <div className="p-7 sm:p-10">
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

          {editActions ? <div className="mt-5">{editActions}</div> : null}

          <div className="mt-8">{children}</div>
        </div>
      </article>
    </main>
  );
}


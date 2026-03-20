import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { formatReadingTime } from "@/lib/reading-time";
import { siteMetadata } from "@/lib/site-metadata";
import type { Post } from "@/types/post";
import { postExcerpt } from "@/lib/excerpt";

const AVATAR = "/static/images/avatar.png";

type BlogHeaderProps = {
  post: Post;
  isoDate: string | undefined;
};

export function BlogHeader({ post, isoDate }: BlogHeaderProps) {
  const excerpt = postExcerpt(post.content, 220);
  const readingTime = formatReadingTime(post.content);
  const dateLabel = formatDate(isoDate, siteMetadata.locale);

  return (
    <header className="border-b border-slate-200/80 pb-10 dark:border-slate-800/80">
      {post.category?.name ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
          {post.category.name}
        </p>
      ) : null}
      <h1 className="text-pretty text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15] dark:text-slate-50">
        {post.title}
      </h1>
      {excerpt ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {excerpt}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Image
          src={AVATAR}
          alt={siteMetadata.author}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-200/90 dark:ring-slate-700"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{siteMetadata.author}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-slate-500 dark:text-slate-400">
            {isoDate ? (
              <time dateTime={isoDate} className="tabular-nums">
                {dateLabel}
              </time>
            ) : null}
            {isoDate ? (
              <span className="text-slate-300 dark:text-slate-600" aria-hidden>
                ·
              </span>
            ) : null}
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

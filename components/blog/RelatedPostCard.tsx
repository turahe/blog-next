"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import { postExcerpt } from "@/lib/excerpt";
import { resolvePostCoverUrl } from "@/lib/blog-content";
import { siteMetadata } from "@/lib/site-metadata";
import type { Post } from "@/types/post";

type RelatedPostCardProps = {
  post: Post;
};

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  const href = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const cover = resolvePostCoverUrl(post);
  const excerpt = postExcerpt(post.content, 120);
  const date = formatDate(post.createdAt, siteMetadata.locale);
  const needsUnopt = Boolean(cover?.startsWith("http"));

  return (
    <li>
      <Link
        href={href}
        className="group block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm shadow-slate-900/[0.04] transition-[border-color,box-shadow] duration-300 ease-out hover:border-slate-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/40 dark:shadow-black/20 dark:hover:border-slate-600"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800/60">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover transition-[transform] duration-[400ms] ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 640px) 100vw, 33vw"
              unoptimized={needsUnopt}
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-slate-200/90 via-slate-100 to-slate-200/70 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900"
              aria-hidden
            />
          )}
        </div>
        <div className="p-5">
          <time
            dateTime={post.createdAt ?? undefined}
            className="text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400"
          >
            {date}
          </time>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-pretty text-slate-900 transition-colors duration-300 group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
            {post.title}
          </h3>
          {excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{excerpt}</p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}

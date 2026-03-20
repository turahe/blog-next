import Link from "next/link";
import { Post } from "@/types/post";
import { TagChip } from "@/components/TagChip";
import { postExcerpt } from "@/lib/excerpt";
import { formatDate } from "@/lib/format-date";
import { formatReadingTime } from "@/lib/reading-time";
import { siteMetadata } from "@/lib/site-metadata";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const dateLabel = formatDate(post.createdAt, siteMetadata.locale);
  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const excerpt = postExcerpt(post.content, 220);

  return (
    <article className="group border-b border-slate-200 py-10 first:pt-2 dark:border-slate-800">
      <Link href={postPath} className="block rounded-xl outline-none ring-primary-500 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          {post.createdAt ? (
            <time dateTime={post.createdAt} className="tabular-nums">
              {dateLabel}
            </time>
          ) : (
            <span className="tabular-nums">—</span>
          )}
          <span className="font-normal text-slate-300 dark:text-slate-600" aria-hidden>
            ·
          </span>
          <span>{formatReadingTime(post.content)}</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 transition group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
          {post.title}
        </h2>
        {excerpt ? (
          <p className="mt-3 line-clamp-3 text-[1.0625rem] leading-relaxed text-slate-600 dark:text-slate-400">
            {excerpt}
          </p>
        ) : null}
      </Link>
      {post.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag.id} tag={tag} />
          ))}
        </div>
      ) : null}
      {!post.tags?.length && post.category?.name ? (
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
            #{post.category.name}
          </span>
        </div>
      ) : null}
    </article>
  );
}

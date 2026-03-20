import Link from "next/link";
import { Post } from "@/types/post";
import { TagChip } from "@/components/TagChip";
import { formatReadingTime } from "@/lib/reading-time";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A";
  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;

  return (
    <article className="border-b border-slate-200 py-7 dark:border-slate-800">
      <Link href={postPath} className="block">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <time>{createdAt}</time>
          <span className="font-normal text-slate-300 dark:text-slate-600" aria-hidden>
            ·
          </span>
          <span className="normal-case">{formatReadingTime(post.content)}</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 line-clamp-2 dark:text-slate-100">
          {post.title}
        </h2>
        <p className="mt-3 text-slate-600 line-clamp-3 leading-7 dark:text-slate-300">
          {post.content}
        </p>
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

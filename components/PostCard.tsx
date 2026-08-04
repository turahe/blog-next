import Link from "next/link";
import { Post } from "@/types/post";
import { TagChip } from "@/components/TagChip";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { postExcerpt } from "@/lib/excerpt";
import { formatDate } from "@/lib/format-date";
import { formatReadingTime } from "@/lib/reading-time";
import { siteMetadata } from "@/lib/site-metadata";

interface PostCardProps {
  post: Post;
  authorLabel?: string;
}

export function PostCard({ post, authorLabel }: PostCardProps) {
  const dateLabel = formatDate(post.createdAt, siteMetadata.locale);
  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const excerpt = postExcerpt(post.content, 220);
  const author = authorLabel ?? siteMetadata.author;

  return (
    <article className="group border-b border-border py-10 first:pt-2">
      <Link
        href={postPath}
        className="block rounded-md outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="mb-2 flex flex-wrap items-center gap-x-2 text-small text-muted-foreground">
          {post.createdAt ? (
            <time dateTime={post.createdAt} className="tabular-nums">
              {dateLabel}
            </time>
          ) : (
            <span className="tabular-nums">—</span>
          )}
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span>{formatReadingTime(post.content)}</span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span>{author}</span>
        </div>
        <Heading
          as="h2"
          level={3}
          className="transition group-hover:text-primary"
        >
          {post.title}
        </Heading>
        {excerpt ? (
          <Text variant="muted" className="mt-3 line-clamp-3">
            {excerpt}
          </Text>
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
          <Text as="span" variant="small">
            {post.category.name}
          </Text>
        </div>
      ) : null}
    </article>
  );
}

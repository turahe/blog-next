import type { ReactNode } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { formatReadingTime } from "@/lib/reading-time";
import { siteMetadata } from "@/lib/site-metadata";
import type { Post } from "@/types/post";
import { postExcerpt } from "@/lib/excerpt";

const AVATAR =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE ?? "/images/about-portrait.svg";

type BlogHeaderProps = {
  post: Post;
  isoDate: string | undefined;
  updatedLabel?: string;
  shareSlot?: ReactNode;
};

export function BlogHeader({
  post,
  isoDate,
  updatedLabel,
  shareSlot,
}: BlogHeaderProps) {
  const excerpt = postExcerpt(post.content, 220);
  const readingTime = formatReadingTime(post.content);
  const dateLabel = formatDate(isoDate, siteMetadata.locale);
  const updatedAt = post.updatedAt;
  const showUpdated =
    Boolean(updatedAt) &&
    Boolean(isoDate) &&
    updatedAt !== isoDate &&
    Date.parse(updatedAt!) > Date.parse(isoDate!);
  const updatedDateLabel = showUpdated
    ? formatDate(updatedAt, siteMetadata.locale)
    : null;

  return (
    <header className="border-b border-border pb-10">
      {post.category?.name ? (
        <p className="section-label mb-4">{post.category.name}</p>
      ) : null}
      <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
        {post.title}
      </h1>
      {excerpt ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Image
          src={AVATAR}
          alt={siteMetadata.author}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-border"
          unoptimized={AVATAR.endsWith(".svg")}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {siteMetadata.author}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
            {isoDate ? (
              <time dateTime={isoDate} className="tabular-nums">
                {dateLabel}
              </time>
            ) : null}
            {isoDate ? (
              <span className="text-border" aria-hidden>
                ·
              </span>
            ) : null}
            <span>{readingTime}</span>
            {showUpdated && updatedDateLabel ? (
              <>
                <span className="text-border" aria-hidden>
                  ·
                </span>
                <span>
                  {updatedLabel ?? "Updated"}{" "}
                  <time dateTime={updatedAt} className="tabular-nums">
                    {updatedDateLabel}
                  </time>
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {shareSlot ? <div className="mt-6 lg:hidden">{shareSlot}</div> : null}
    </header>
  );
}

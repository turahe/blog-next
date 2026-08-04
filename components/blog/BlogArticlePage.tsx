import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BlogTocProvider } from "@/components/blog/blog-toc-context";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPrevNext } from "@/components/blog/BlogPrevNext";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogScrollReveal } from "@/components/blog/BlogScrollReveal";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import type { AdjacentPostLink } from "@/lib/post-relations";
import type { BlogTocHeading } from "@/lib/blog-content";
import type { Post } from "@/types/post";
import type { Tag } from "@/types/tag";

type BlogArticleLabels = {
  allPosts: string;
  toc: string;
  share: string;
  tags: string;
  related: string;
  previous: string;
  next: string;
  updated: string;
  copyCode: string;
  copiedCode: string;
};

type BlogArticlePageProps = {
  post: Post;
  tags: Tag[];
  articleHtml: string;
  headings: BlogTocHeading[];
  relatedPosts: Post[];
  coverImageUrl?: string;
  shareUrl: string;
  isoDate: string | undefined;
  previous?: AdjacentPostLink;
  next?: AdjacentPostLink;
  labels: BlogArticleLabels;
};

export function BlogArticlePage({
  post,
  tags,
  articleHtml,
  headings,
  relatedPosts,
  coverImageUrl,
  shareUrl,
  isoDate,
  previous,
  next,
  labels,
}: BlogArticlePageProps) {
  const shareButtons = (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {labels.share}
      </p>
      <BlogShareButtons url={shareUrl} title={post.title} />
    </div>
  );

  return (
    <>
      <BlogReadingProgress />
      <Container size="content" className="py-12 sm:py-14 lg:py-20">
        <Link
          href="/posts"
          className="blog-nav-link group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          {labels.allPosts}
        </Link>

        <BlogTocProvider headings={headings}>
          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-14 xl:gap-20">
            <article className="min-w-0 max-w-3xl">
              <BlogScrollReveal>
                <BlogTocMobile headings={headings} label={labels.toc} />
                <BlogHeader
                  post={post}
                  isoDate={isoDate}
                  updatedLabel={labels.updated}
                  shareSlot={shareButtons}
                />
              </BlogScrollReveal>

              {coverImageUrl ? (
                <BlogScrollReveal delay={0.03}>
                  <BlogCoverImage src={coverImageUrl} alt={post.title} />
                </BlogScrollReveal>
              ) : null}

              <BlogScrollReveal delay={coverImageUrl ? 0.06 : 0.03}>
                <BlogContent
                  html={articleHtml}
                  copyLabel={labels.copyCode}
                  copiedLabel={labels.copiedCode}
                />
              </BlogScrollReveal>

              <BlogScrollReveal delay={0.06}>
                <BlogPrevNext
                  previous={previous}
                  next={next}
                  previousLabel={labels.previous}
                  nextLabel={labels.next}
                />
              </BlogScrollReveal>

              <BlogScrollReveal delay={0.06}>
                <RelatedPosts
                  posts={relatedPosts}
                  heading={labels.related}
                />
              </BlogScrollReveal>
            </article>

            <BlogSidebar
              headings={headings}
              tags={tags}
              shareUrl={shareUrl}
              shareTitle={post.title}
              tocLabel={labels.toc}
              shareLabel={labels.share}
              tagsLabel={labels.tags}
            />
          </div>
        </BlogTocProvider>
      </Container>
    </>
  );
}

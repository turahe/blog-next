import Link from "next/link";
import { BlogTocProvider } from "@/components/blog/blog-toc-context";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogScrollReveal } from "@/components/blog/BlogScrollReveal";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogTocMobile } from "@/components/blog/BlogTocMobile";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import type { BlogTocHeading } from "@/lib/blog-content";
import type { Post } from "@/types/post";
import type { Tag } from "@/types/tag";

type BlogArticlePageProps = {
  post: Post;
  tags: Tag[];
  articleHtml: string;
  headings: BlogTocHeading[];
  relatedPosts: Post[];
  coverImageUrl?: string;
  shareUrl: string;
  isoDate: string | undefined;
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
}: BlogArticlePageProps) {
  return (
    <main className="min-h-0 flex-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-transparent py-12 sm:py-14 lg:py-20">
          <Link
            href="/posts"
            className="blog-nav-link group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All posts
          </Link>

          <BlogTocProvider headings={headings}>
            <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-14 xl:gap-20">
              <article className="min-w-0 max-w-3xl">
                <BlogScrollReveal>
                  <BlogTocMobile headings={headings} />
                  <BlogHeader post={post} isoDate={isoDate} />
                </BlogScrollReveal>

                {coverImageUrl ? (
                  <BlogScrollReveal delay={0.03}>
                    <BlogCoverImage src={coverImageUrl} alt={post.title} />
                  </BlogScrollReveal>
                ) : null}

                <BlogScrollReveal delay={coverImageUrl ? 0.06 : 0.03}>
                  <BlogContent html={articleHtml} />
                </BlogScrollReveal>

                <BlogScrollReveal delay={0.06}>
                  <RelatedPosts posts={relatedPosts} />
                </BlogScrollReveal>
              </article>

              <BlogSidebar
                headings={headings}
                tags={tags}
                shareUrl={shareUrl}
                shareTitle={post.title}
              />
            </div>
          </BlogTocProvider>
        </div>
      </div>
    </main>
  );
}

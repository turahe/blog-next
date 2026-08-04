import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { blogApi } from "@/lib/api/blog";
import {
  preparePostArticleHtml,
  resolvePostCoverUrl,
} from "@/lib/blog-content";
import { postExcerpt } from "@/lib/excerpt";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import {
  getAdjacentPosts,
  pickRelatedPosts,
} from "@/lib/post-relations";
import { siteMetadata } from "@/lib/site-metadata";
import { getSiteUrl } from "@/lib/site-url";
import { tagsApi } from "@/lib/api/tags";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { id: slug } = await params;
  const siteBase = getSiteUrl();

  try {
    const post = await blogApi.getPostBySlug(slug);
    if (post.draft) {
      return { title: "Post not found", robots: { index: false, follow: false } };
    }
    const description = postExcerpt(post.content, 160);
    const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
    const cover = resolvePostCoverUrl(post);
    const absoluteCover = cover
      ? cover.startsWith("http")
        ? cover
        : `${siteBase}${cover}`
      : undefined;

    return {
      title: post.title,
      description,
      alternates: { canonical: postPath },
      openGraph: {
        title: post.title,
        description,
        type: "article",
        url: `${siteBase}${postPath}`,
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [siteMetadata.author],
        images: absoluteCover ? [{ url: absoluteCover }] : undefined,
      },
      twitter: {
        card: absoluteCover ? "summary_large_image" : "summary",
        title: post.title,
        description,
        images: absoluteCover ? [absoluteCover] : undefined,
      },
    };
  } catch {
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
    const messages = getMessages(locale);
    return {
      title: translate(
        messages as unknown as Record<string, unknown>,
        "posts.metaNotFound",
      ),
    };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id: slug } = await params;
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  const post = await blogApi.getPostBySlug(slug).catch(() => null);
  if (!post || post.draft) {
    notFound();
  }

  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const tags = post.tags?.length
    ? post.tags
    : post.tagIds?.length
      ? (await tagsApi.getTagsSafe(500)).filter((tag) =>
          post.tagIds?.includes(tag.id),
        )
      : [];

  const { html: articleHtml, headings } = preparePostArticleHtml(post.content);
  const list = await blogApi.getPostsSafe({ limit: 50 });
  const relatedPosts = pickRelatedPosts(post, list.data, 3);
  const { previous, next } = getAdjacentPosts(post, list.data);
  const siteBase = getSiteUrl();
  const shareUrl = `${siteBase}${postPath}`;
  const coverImageUrl = resolvePostCoverUrl(post);
  const absoluteCover = coverImageUrl
    ? coverImageUrl.startsWith("http")
      ? coverImageUrl
      : `${siteBase}${coverImageUrl}`
    : undefined;
  const description = postExcerpt(post.content, 160);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
    },
    image: absoluteCover ? [absoluteCover] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
    url: shareUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticlePage
        post={post}
        tags={tags}
        articleHtml={articleHtml}
        headings={headings}
        relatedPosts={relatedPosts}
        coverImageUrl={coverImageUrl}
        shareUrl={shareUrl}
        isoDate={post.createdAt}
        previous={previous}
        next={next}
        labels={{
          allPosts: t("writing.allPosts"),
          toc: t("postDetail.toc"),
          share: t("postDetail.share"),
          tags: t("postDetail.tags"),
          related: t("postDetail.related"),
          previous: t("postDetail.previous"),
          next: t("postDetail.next"),
          updated: t("postDetail.updated"),
          copyCode: t("postDetail.copyCode"),
          copiedCode: t("postDetail.copiedCode"),
        }}
      />
    </>
  );
}

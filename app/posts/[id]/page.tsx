import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { getSiteUrl } from "@/lib/site-url";
import { postExcerpt } from "@/lib/excerpt";
import { preparePostArticleHtml, resolvePostCoverUrl } from "@/lib/blog-content";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { postQueryService } from "@/services/post.query";
import { tagQueryService } from "@/services/tag.query";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id: slug } = await params;
  try {
    const post = await postQueryService.getPostBySlug(slug);
    return {
      title: post.title,
      description: postExcerpt(post.content, 160),
    };
  } catch {
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
    const messages = getMessages(locale);
    return {
      title: translate(messages as unknown as Record<string, unknown>, "posts.metaNotFound"),
    };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id: slug } = await params;
  const post = await postQueryService.getPostBySlug(slug).catch(() => null);
  if (!post) {
    notFound();
  }

  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const tags = post.tags?.length
    ? post.tags
    : post.tagIds?.length
      ? (await tagQueryService.getTagsSafe(500)).filter((tag) => post.tagIds?.includes(tag.id))
      : [];

  const { html: articleHtml, headings } = preparePostArticleHtml(post.content);
  const list = await postQueryService.getPostsSafe({ limit: 16 });
  const relatedPosts = list.data.filter((p) => p.id !== post.id).slice(0, 3);
  const siteBase = getSiteUrl();
  const shareUrl = siteBase ? `${siteBase}${postPath}` : postPath;
  const coverImageUrl = resolvePostCoverUrl(post);

  return (
    <BlogArticlePage
      post={post}
      tags={tags}
      articleHtml={articleHtml}
      headings={headings}
      relatedPosts={relatedPosts}
      coverImageUrl={coverImageUrl}
      shareUrl={shareUrl}
      isoDate={post.createdAt}
    />
  );
}

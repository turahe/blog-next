/**
 * Map the live backend `Post` record onto the canonical `BlogPost` contract.
 * Safe defaults keep public routes draft-free when the API omits `draft`.
 */
import type { BlogPost } from "@/lib/api/types";
import type { Post } from "@/types/post";
import { postExcerpt } from "@/lib/excerpt";

export function mapPostToBlogPost(post: Post): BlogPost {
  const description = postExcerpt(post.content, 160) || post.title;
  const coverImage =
    post.coverImageUrl ??
    post.bannerImageUrl ??
    post.imageUrl ??
    post.image ??
    undefined;

  return {
    id: post.id,
    slug: post.slug ?? String(post.id),
    title: post.title,
    description,
    content: post.content,
    excerpt: description,
    coverImage: coverImage ?? undefined,
    publishedAt: post.createdAt ?? new Date(0).toISOString(),
    updatedAt: post.updatedAt,
    category: post.category
      ? {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
        }
      : undefined,
    tags: post.tags ?? [],
    draft: Boolean(post.draft),
    featured: false,
  };
}

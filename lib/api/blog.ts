import "server-only";
import { apiCache } from "@/lib/api/cache";
import { apiRequest } from "@/lib/api/client";
import { ApiEnvelope, PaginatedPosts, Post } from "@/types/post";

interface ListPostsParams {
  cursor?: string;
  dir?: "next" | "prev";
  limit?: number;
}

interface ListPostsByTagParams {
  tagId: number;
  cursor?: string;
  limit?: number;
}

interface RawPost extends Post {
  created_at?: string;
}

const normalizePost = (post: RawPost): Post => ({
  ...post,
  createdAt: post.createdAt ?? post.created_at,
});

const normalizePosts = (payload: unknown): Post[] => {
  if (Array.isArray(payload)) {
    return payload.map((post) => normalizePost(post as RawPost));
  }

  if (payload && typeof payload === "object" && "items" in payload) {
    const data = payload as { items?: unknown };
    if (Array.isArray(data.items)) {
      return data.items.map((post) => normalizePost(post as RawPost));
    }
  }

  return [];
};

const emptyPaginatedPosts = (): PaginatedPosts => ({
  data: [],
  nextCursor: undefined,
  prevCursor: undefined,
});

/**
 * Blog content API.
 * Paths follow the current backend (`/posts`). When the backend migrates to
 * `/blog/posts`, update only this module.
 */
export const blogApi = {
  async getPostsSafe(params: ListPostsParams = {}): Promise<PaginatedPosts> {
    try {
      return await this.getPosts(params);
    } catch {
      return emptyPaginatedPosts();
    }
  },

  async getPosts(params: ListPostsParams = {}): Promise<PaginatedPosts> {
    const limit = params.limit ?? 10;
    const searchParams = new URLSearchParams();
    searchParams.set("limit", String(limit));
    if (params.cursor) searchParams.set("cursor", params.cursor);
    if (params.dir) searchParams.set("dir", params.dir);

    const envelope = await apiRequest<ApiEnvelope<unknown>>(
      `/posts?${searchParams.toString()}`,
      {
        revalidate: apiCache.blogList.revalidate,
        tags: [...apiCache.blogList.tags],
      },
    );
    const posts = normalizePosts(envelope.data);

    return {
      data: posts,
      nextCursor: envelope.nextCursor,
      prevCursor: envelope.prevCursor,
    };
  },

  async getPostById(id: string | number): Promise<Post> {
    const envelope = await apiRequest<ApiEnvelope<RawPost>>(`/posts/${id}`, {
      revalidate: apiCache.blogDetail.revalidate,
      tags: [...apiCache.blogDetail.tags(id)],
    });
    return normalizePost(envelope.data);
  },

  async getPostBySlug(slug: string): Promise<Post> {
    const envelope = await apiRequest<ApiEnvelope<RawPost>>(
      `/posts/slug/${encodeURIComponent(slug)}`,
      {
        revalidate: apiCache.blogDetail.revalidate,
        tags: [...apiCache.blogDetail.tags(slug)],
      },
    );
    return normalizePost(envelope.data);
  },

  async getPostsByTag({
    tagId,
    cursor,
    limit = 10,
  }: ListPostsByTagParams): Promise<PaginatedPosts> {
    const pageSize = Math.min(Math.max(limit, 1), 50);
    const collected: Post[] = [];
    let currentCursor = cursor;
    let nextCursor: string | undefined;
    let guard = 0;

    while (collected.length < pageSize && guard < 10) {
      const page = await this.getPosts({
        cursor: currentCursor,
        dir: "next",
        limit: 50,
      });

      const matched = page.data.filter((post) => {
        if (post.tags?.some((tag) => tag.id === tagId)) return true;
        if (post.tagIds?.includes(tagId)) return true;
        return false;
      });

      collected.push(...matched);
      nextCursor = page.nextCursor;
      guard += 1;

      if (!nextCursor) break;
      currentCursor = nextCursor;
    }

    return {
      data: collected.slice(0, pageSize),
      nextCursor,
      prevCursor: undefined,
    };
  },

  async getPostsByTagSafe(
    params: ListPostsByTagParams,
  ): Promise<PaginatedPosts> {
    try {
      return await this.getPostsByTag(params);
    } catch {
      return emptyPaginatedPosts();
    }
  },
};

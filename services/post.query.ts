import "server-only";
import { ApiEnvelope, PaginatedPosts, Post } from "@/types/post";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

const DEFAULT_REVALIDATE_SECONDS = 60;

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

async function fetchJson<T>(path: string, revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "force-cache",
    next: { revalidate },
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const postQueryService = {
  async getPosts(params: ListPostsParams = {}): Promise<PaginatedPosts> {
    const limit = params.limit ?? 10;

    const searchParams = new URLSearchParams();
    searchParams.set("limit", String(limit));
    if (params.cursor) searchParams.set("cursor", params.cursor);
    if (params.dir) searchParams.set("dir", params.dir);

    const envelope = await fetchJson<ApiEnvelope<unknown>>(
      `/posts?${searchParams.toString()}`,
    );
    const posts = normalizePosts(envelope.data);

    return {
      data: posts,
      nextCursor: envelope.nextCursor,
      prevCursor: envelope.prevCursor,
    };
  },

  async getPostById(id: string | number): Promise<Post> {
    const envelope = await fetchJson<ApiEnvelope<RawPost>>(`/posts/${id}`);
    return normalizePost(envelope.data);
  },

  async getPostBySlug(slug: string): Promise<Post> {
    const envelope = await fetchJson<ApiEnvelope<RawPost>>(
      `/posts/slug/${encodeURIComponent(slug)}`,
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
};

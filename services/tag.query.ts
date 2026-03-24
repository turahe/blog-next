import "server-only";
import { ApiEnvelope } from "@/types/post";
import { Tag } from "@/types/tag";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const revalidate = 300;

async function fetchJson<T>(path: string): Promise<T> {
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

const normalizeTags = (payload: unknown): Tag[] => {
  if (!Array.isArray(payload)) return [];
  return payload
    .map((tag) => tag as Tag)
    .filter((tag) => Boolean(tag.id && tag.name && tag.slug));
};

export const tagQueryService = {
  /** Same as getTags, but returns [] when the API is unreachable. */
  async getTagsSafe(limit = 200): Promise<Tag[]> {
    try {
      return await this.getTags(limit);
    } catch {
      return [];
    }
  },

  async getTags(limit = 200): Promise<Tag[]> {
    const envelope = await fetchJson<ApiEnvelope<unknown>>(`/tags?limit=${limit}`);
    const tags = normalizeTags(envelope.data);
    return tags.sort((a, b) => a.name.localeCompare(b.name));
  },

  async getTagBySlug(slug: string): Promise<Tag> {
    const envelope = await fetchJson<ApiEnvelope<unknown>>(`/tags/${encodeURIComponent(slug)}`);
    const data = envelope.data as Tag | undefined;
    if (!data?.id || !data?.slug || !data?.name) {
      throw new Error("Tag not found");
    }
    return data;
  },
};

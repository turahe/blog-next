import "server-only";
import { apiCache } from "@/lib/api/cache";
import { apiRequest } from "@/lib/api/client";
import { ApiEnvelope } from "@/types/post";
import { Tag } from "@/types/tag";

const normalizeTags = (payload: unknown): Tag[] => {
  if (!Array.isArray(payload)) return [];
  return payload
    .map((tag) => tag as Tag)
    .filter((tag) => Boolean(tag.id && tag.name && tag.slug));
};

/**
 * Tags API. Presentation code should use this module (or the thin service wrapper).
 */
export const tagsApi = {
  async getTagsSafe(limit = 200): Promise<Tag[]> {
    try {
      return await this.getTags(limit);
    } catch {
      return [];
    }
  },

  async getTags(limit = 200): Promise<Tag[]> {
    const envelope = await apiRequest<ApiEnvelope<unknown>>(
      `/tags?limit=${limit}`,
      {
        revalidate: apiCache.tags.revalidate,
        tags: [...apiCache.tags.tags],
      },
    );
    const tags = normalizeTags(envelope.data);
    return tags.sort((a, b) => a.name.localeCompare(b.name));
  },

  async getTagBySlug(slug: string): Promise<Tag> {
    const envelope = await apiRequest<ApiEnvelope<unknown>>(
      `/tags/${encodeURIComponent(slug)}`,
      {
        revalidate: apiCache.tagDetail.revalidate,
        tags: [...apiCache.tagDetail.tags(slug)],
      },
    );
    const data = envelope.data as Tag | undefined;
    if (!data?.id || !data?.slug || !data?.name) {
      throw new Error("Tag not found");
    }
    return data;
  },
};

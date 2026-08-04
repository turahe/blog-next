import "server-only";
import { apiCache } from "@/lib/api/cache";
import { apiRequest } from "@/lib/api/client";
import type { Paginated, Project } from "@/lib/api/types";
import { ApiEnvelope } from "@/types/post";

export type { Project } from "@/lib/api/types";
export type ProjectListParams = {
  page?: number;
  limit?: number;
  category?: string;
  technology?: string;
  featured?: boolean;
};

export type PaginatedProjects = Paginated<Project>;

/**
 * Projects API (`/projects`). Calls go through the shared server client.
 */
export const projectsApi = {
  async list(params: ProjectListParams = {}): Promise<PaginatedProjects> {
    const searchParams = new URLSearchParams();
    if (params.page != null) searchParams.set("page", String(params.page));
    if (params.limit != null) searchParams.set("limit", String(params.limit));
    if (params.category) searchParams.set("category", params.category);
    if (params.technology) searchParams.set("technology", params.technology);
    if (params.featured != null) {
      searchParams.set("featured", String(params.featured));
    }

    const query = searchParams.toString();
    const envelope = await apiRequest<
      ApiEnvelope<Project[] | { items?: Project[] }> & {
        meta?: PaginatedProjects["meta"];
      }
    >(`/projects${query ? `?${query}` : ""}`, {
      revalidate: apiCache.projects.revalidate,
      tags: [...apiCache.projects.tags],
    });

    const payload = envelope.data;
    const data = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.items)
        ? payload.items
        : [];

    return { data, meta: envelope.meta };
  },

  async listSafe(params: ProjectListParams = {}): Promise<PaginatedProjects> {
    try {
      return await this.list(params);
    } catch {
      return { data: [] };
    }
  },

  async getBySlug(slug: string): Promise<Project> {
    const envelope = await apiRequest<ApiEnvelope<Project>>(
      `/projects/${encodeURIComponent(slug)}`,
      {
        revalidate: apiCache.projectDetail.revalidate,
        tags: [...apiCache.projectDetail.tags(slug)],
      },
    );
    return envelope.data;
  },
};

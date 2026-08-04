import "server-only";
import { blogApi } from "@/lib/api/blog";

/**
 * @deprecated Prefer `blogApi` from `@/lib/api`. Thin compatibility wrapper.
 */
export const postQueryService = blogApi;

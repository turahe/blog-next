import "server-only";
import { tagsApi } from "@/lib/api/tags";

/**
 * @deprecated Prefer `tagsApi` from `@/lib/api`. Thin compatibility wrapper.
 */
export const tagQueryService = tagsApi;

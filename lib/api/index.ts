export { getApiBaseUrl } from "@/lib/api/config";
export { apiCache, type ApiCachePolicy } from "@/lib/api/cache";
export {
  apiRequest,
  ApiRequestError,
  type ApiRequestOptions,
} from "@/lib/api/client";
export {
  isTransientStatus,
  normalizeHttpError,
  parseApiErrorBody,
  toApiRequestError,
} from "@/lib/api/errors";
export { blogApi } from "@/lib/api/blog";
export { projectsApi } from "@/lib/api/projects";
export { profileApi } from "@/lib/api/profile";
export { tagsApi } from "@/lib/api/tags";
export { api } from "@/lib/api/browser";
export { mapPostToBlogPost } from "@/lib/api/mappers";
export type {
  ApiErrorBody,
  Author,
  BlogPost,
  Category,
  Experience,
  Paginated,
  PaginationMeta,
  Profile,
  Project,
  Skill,
  SocialLink,
} from "@/lib/api/types";

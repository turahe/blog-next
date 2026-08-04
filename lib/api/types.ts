/**
 * Shared API domain types.
 *
 * Conceptual models follow `docs/api.md`. When OpenAPI is available, prefer
 * generated types and keep this file as a thin re-export / adapter layer.
 */

import type { Tag } from "@/types/tag";

/** Common paginated list metadata (docs/api.md §14). */
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Paginated<T> = {
  data: T[];
  meta?: PaginationMeta;
  nextCursor?: string;
  prevCursor?: string;
};

export type Author = {
  id?: string | number;
  name: string;
  avatar?: string;
  url?: string;
};

export type Category = {
  id: string | number;
  name: string;
  slug: string;
};

/**
 * Canonical blog post shape from the API contract.
 * Maps onto the current backend `Post` model where fields overlap.
 */
export type BlogPost = {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: Author;
  category?: Category;
  tags: Tag[];
  draft: boolean;
  featured: boolean;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  coverImage?: string;
  year?: number;
  role?: string;
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  category?: string;
  status?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  avatar?: string;
  location?: string;
  website?: string;
  socialLinks: SocialLink[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string;
};

/** Normalized API error payload (docs/api.md §15). */
export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
  };
};

import { Tag } from "@/types/tag";

export interface Post {
  id: number;
  title: string;
  content: string;
  slug?: string;
  layout?: string;
  userId?: number;
  categoryId?: number;
  createdBy?: number;
  updatedBy?: number;
  updatedAt?: string;
  deletedAt?: string | null;
  createdAt?: string;
  tagIds?: number[];
  tags?: Tag[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  // Optional media fields (not always present in API responses)
  image?: string | null;
  imageUrl?: string | null;
  bannerImageUrl?: string | null;
  coverImageUrl?: string | null;
  images?: Array<string | { url?: string }>;
}

export interface PaginatedPosts {
  data: Post[];
  nextCursor?: string;
  prevCursor?: string;
}

export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
  nextCursor?: string;
  prevCursor?: string;
}

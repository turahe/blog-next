import { api } from "@/lib/api";
import { ApiEnvelope, Post } from "@/types/post";

interface PostPayload {
  title: string;
  content: string;
  categoryId: number;
  tagIds?: number[];
}

export const postService = {
  async getPostById(id: string | number): Promise<Post> {
    const response = await api.get<ApiEnvelope<Post>>(`/posts/${id}`);
    return response.data.data;
  },

  async createPost(payload: PostPayload): Promise<Post> {
    const response = await api.post<ApiEnvelope<Post>>("/posts", payload);
    return response.data.data;
  },

  async updatePost(id: string | number, payload: PostPayload): Promise<Post> {
    const response = await api.put<ApiEnvelope<Post>>(`/posts/${id}`, payload);
    return response.data.data;
  },

  async deletePost(id: string | number): Promise<void> {
    await api.delete(`/posts/${id}`);
  },
};

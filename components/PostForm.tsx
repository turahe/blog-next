"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postService } from "@/services/post.service";

interface PostFormProps {
  mode: "create" | "edit";
  initialValues?: {
    title: string;
    content: string;
    categoryId?: number;
  };
  postId?: string;
}

export function PostForm({ mode, initialValues, postId }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId ? String(initialValues.categoryId) : "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId.trim()) {
      setError("Title, content, and category ID are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (mode === "create") {
        const created = await postService.createPost({
          title,
          content,
          categoryId: Number(categoryId),
        });
        router.push(`/posts/${created.slug ?? created.id}`);
      } else if (postId) {
        const updated = await postService.updatePost(postId, {
          title,
          content,
          categoryId: Number(categoryId),
        });
        router.push(`/posts/${updated.slug ?? updated.id}`);
      }
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Failed to save post.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/20"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="Write your title"
          required
        />
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Category ID
        </label>
        <input
          id="categoryId"
          type="number"
          min={1}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="e.g. 1"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-52 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="Write your content"
          required
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        {submitting ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
      </button>
    </form>
  );
}

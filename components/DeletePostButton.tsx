"use client";

import { useRouter } from "next/navigation";
import { postService } from "@/services/post.service";

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();

  const onDelete = async () => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;

    try {
      await postService.deletePost(postId);
      router.push("/");
      router.refresh();
    } catch {
      window.alert("Failed to delete post.");
    }
  };

  return (
    <button
      onClick={onDelete}
      className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/40"
    >
      Delete
    </button>
  );
}

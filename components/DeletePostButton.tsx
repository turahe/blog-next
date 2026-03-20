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
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}

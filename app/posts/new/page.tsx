import Link from "next/link";
import { PostForm } from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Post</h1>
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Back to posts
        </Link>
      </div>
      <PostForm mode="create" />
    </main>
  );
}

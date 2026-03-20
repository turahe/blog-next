import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { postQueryService } from "@/services/post.query";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id: slug } = await params;
  const post = await postQueryService.getPostBySlug(slug).catch(() => null);
  if (!post) {
    notFound();
  }
  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Post</h1>
        <Link
          href={postPath}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Back to post
        </Link>
      </div>
      <PostForm
        mode="edit"
        postId={String(post.id)}
        initialValues={{
          title: post.title,
          content: post.content,
          categoryId: post.categoryId,
        }}
      />
    </main>
  );
}

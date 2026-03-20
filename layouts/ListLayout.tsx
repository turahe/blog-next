import type { ReactNode } from "react";
import Link from "next/link";

import type { Post } from "@/types/post";
import { PostList } from "@/components/PostList";
import { PaginationControls } from "@/components/PaginationControls";

interface CursorPagination {
  nextCursor?: string;
  prevCursor?: string;
  pathname?: string;
  limit?: number;
}

interface ListLayoutProps {
  posts: Post[];
  title: string;
  description?: string;
  children?: ReactNode;
  pagination?: CursorPagination;
}

export function ListLayout({
  posts,
  title,
  description,
  children,
  pagination,
}: ListLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}
      </header>

      <PostList posts={posts} />

      {pagination ? (
        <PaginationControls
          nextCursor={pagination.nextCursor}
          prevCursor={pagination.prevCursor}
          pathname={pagination.pathname}
          limit={pagination.limit}
        />
      ) : null}

      <div className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
          Home
        </Link>
      </div>
    </main>
  );
}


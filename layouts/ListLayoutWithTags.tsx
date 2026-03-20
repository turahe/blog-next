import type { ReactNode } from "react";

import type { Post } from "@/types/post";
import { ListLayout } from "@/layouts/ListLayout";

interface ListLayoutWithTagsProps {
  posts: Post[];
  title: string;
  description?: string;
  children?: ReactNode;
}

export function ListLayoutWithTags({
  posts,
  title,
  description,
  children,
}: ListLayoutWithTagsProps) {
  return (
    <ListLayout posts={posts} title={title} description={description}>
      {children}
    </ListLayout>
  );
}


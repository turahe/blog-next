import Link from "next/link";
import { Tag } from "@/types/tag";

interface TagChipProps {
  tag: Tag;
  href?: string;
}

export function TagChip({ tag, href = `/tags/${tag.slug}` }: TagChipProps) {
  return (
    <Link
      href={href}
      className="text-xs font-normal text-slate-500 transition hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
    >
      #{tag.name}
    </Link>
  );
}

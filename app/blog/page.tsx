import { redirect } from "next/navigation";

/** Canonical post list lives on `/`; keep `/blog` for bookmarks and nav parity. */
export default function BlogPage() {
  redirect("/posts");
}

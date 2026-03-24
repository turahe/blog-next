import { FeaturedProjectsSection } from "@/sections/FeaturedProjectsSection";
import { HeroSection } from "@/sections/HeroSection";
import { LatestWritingSection } from "@/sections/LatestWritingSection";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { TechStackSection } from "@/sections/TechStackSection";
import type { Post } from "@/types/post";
import { postQueryService } from "@/services/post.query";

export const revalidate = 60;

const MAX_DISPLAY = 5;

export default async function Home() {
  let posts: Post[] = [];
  try {
    const result = await postQueryService.getPosts({ limit: Math.max(10, MAX_DISPLAY) });
    posts = result.data;
  } catch {
    // e.g. API down or NEXT_PUBLIC_API_BASE_URL still pointing at localhost on the server
  }

  return (
    <div className="flex-1">
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <ContactSection />
      <LatestWritingSection posts={posts} maxDisplay={MAX_DISPLAY} />
    </div>
  );
}

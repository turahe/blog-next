import { FeaturedProjectsSection } from "@/sections/FeaturedProjectsSection";
import { HeroSection } from "@/sections/HeroSection";
import { LatestWritingSection } from "@/sections/LatestWritingSection";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { postQueryService } from "@/services/post.query";

export const revalidate = 60;

const MAX_DISPLAY = 5;

export default async function Home() {
  const result = await postQueryService.getPosts({ limit: Math.max(10, MAX_DISPLAY) });
  const posts = result.data;

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

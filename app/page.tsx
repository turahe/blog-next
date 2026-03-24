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
  const { data: posts } = await postQueryService.getPostsSafe({
    limit: Math.max(10, MAX_DISPLAY),
  });

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

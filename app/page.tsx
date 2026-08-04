import { FeaturedProjectsSection } from "@/sections/FeaturedProjectsSection";
import { HeroSection } from "@/sections/HeroSection";
import { LatestWritingSection } from "@/sections/LatestWritingSection";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { postQueryService } from "@/services/post.query";

export const revalidate = 60;

const MAX_DISPLAY = 5;

/**
 * Homepage storytelling order (PRD §4.1), footer via PageShell:
 * Hero → Introduction → Selected projects → Expertise → Articles → Contact
 * Scroll World (Phase 6) enhances the hero later without replacing this HTML.
 */
export default async function Home() {
  const { data: posts } = await postQueryService.getPostsSafe({
    limit: Math.max(10, MAX_DISPLAY),
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <LatestWritingSection posts={posts} maxDisplay={MAX_DISPLAY} />
      <ContactSection />
    </>
  );
}

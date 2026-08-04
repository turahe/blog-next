import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AboutPageView } from "@/components/about/AboutPageView";
import { Container } from "@/components/layout/Container";
import { profileApi } from "@/lib/api/profile";
import {
  aboutContent,
  mapExperienceToTimeline,
} from "@/lib/about-content";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { siteMetadata } from "@/lib/site-metadata";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: `${siteMetadata.author} — ${siteMetadata.jobTitle}. Profile, engineering philosophy, experience, and working principles.`,
  openGraph: {
    title: `About | ${siteMetadata.title}`,
    description: `${siteMetadata.author} — ${siteMetadata.jobTitle}.`,
    type: "profile",
  },
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  const [profile, experience] = await Promise.all([
    profileApi.getProfileSafe(),
    profileApi.getExperienceSafe(),
  ]);

  const timeline =
    experience.length > 0
      ? mapExperienceToTimeline(experience)
      : [...aboutContent.timeline];

  return (
    <Container size="content" className="py-16 sm:py-20 lg:py-24">
      <AboutPageView
        name={profile?.name ?? aboutContent.name}
        headline={profile?.headline ?? aboutContent.headline}
        summary={profile?.bio ?? aboutContent.summary}
        location={profile?.location ?? aboutContent.location}
        portraitSrc={profile?.avatar ?? aboutContent.portraitSrc}
        philosophy={aboutContent.philosophy}
        timeline={timeline}
        interests={aboutContent.interests}
        principles={aboutContent.principles}
        labels={{
          kicker: t("aboutPage.kicker"),
          philosophy: t("aboutPage.philosophy"),
          timeline: t("aboutPage.timeline"),
          interests: t("aboutPage.interests"),
          principles: t("aboutPage.principles"),
          present: t("aboutPage.present"),
          resume: t("aboutPage.resume"),
          contact: t("aboutPage.contact"),
          writing: t("aboutPage.writing"),
          portraitAlt: t("about.profileAlt", { author: siteMetadata.author }),
        }}
      />
    </Container>
  );
}

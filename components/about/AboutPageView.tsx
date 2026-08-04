import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type {
  AboutPrinciple,
  AboutTimelineItem,
} from "@/lib/about-content";
import { siteMetadata } from "@/lib/site-metadata";

type AboutPageViewProps = {
  name: string;
  headline: string;
  summary: string;
  location?: string;
  portraitSrc: string;
  philosophy: readonly string[];
  timeline: AboutTimelineItem[];
  interests: readonly string[];
  principles: readonly AboutPrinciple[];
  labels: {
    kicker: string;
    philosophy: string;
    timeline: string;
    interests: string;
    principles: string;
    present: string;
    resume: string;
    contact: string;
    writing: string;
    portraitAlt: string;
  };
};

function formatRange(
  start: string,
  end: string | undefined,
  presentLabel: string,
): string {
  return end ? `${start} – ${end}` : `${start} – ${presentLabel}`;
}

/**
 * Server-rendered About composition (PRD §4.2).
 */
export function AboutPageView({
  name,
  headline,
  summary,
  location,
  portraitSrc,
  philosophy,
  timeline,
  interests,
  principles,
  labels,
}: AboutPageViewProps) {
  return (
    <article className="space-y-16 sm:space-y-20">
      <header className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] lg:items-start lg:gap-14">
        <div className="min-w-0">
          <p className="section-label">{labels.kicker}</p>
          <Heading level="display" className="mt-3">
            {name}
          </Heading>
          <Text variant="lead" className="mt-4 max-w-xl">
            {headline}
          </Text>
          {location ? (
            <Text variant="small" className="mt-3">
              {location}
            </Text>
          ) : null}
          <Text variant="muted" className="mt-6 max-w-2xl">
            {summary}
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={siteMetadata.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.resume}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#contact">{labels.contact}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/posts">{labels.writing}</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-64 overflow-x-clip lg:mx-0 lg:justify-self-end">
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-primary/10 via-transparent to-muted blur-xl"
            aria-hidden
          />
          <Image
            src={portraitSrc}
            alt={labels.portraitAlt}
            width={320}
            height={400}
            className="relative aspect-[4/5] w-full rounded-2xl border border-border bg-card object-cover"
            priority
            unoptimized={portraitSrc.endsWith(".svg")}
          />
        </div>
      </header>

      <Separator />

      <section aria-labelledby="philosophy-heading" className="space-y-5">
        <Heading as="h2" level={2} id="philosophy-heading">
          {labels.philosophy}
        </Heading>
        <ul className="max-w-2xl list-disc space-y-3 pl-5 marker:text-muted-foreground">
          {philosophy.map((line) => (
            <li key={line}>
              <Text variant="muted">{line}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="timeline-heading" className="space-y-6">
        <Heading as="h2" level={2} id="timeline-heading">
          {labels.timeline}
        </Heading>
        <ol className="relative max-w-2xl space-y-8 border-l border-border pl-6">
          {timeline.map((item) => (
            <li key={item.id} className="relative">
              <span
                className="absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border border-border bg-background"
                aria-hidden
              />
              <p className="text-small text-muted-foreground">
                {formatRange(item.startDate, item.endDate, labels.present)}
              </p>
              <Heading as="h3" level={3} className="mt-1">
                {item.role}
              </Heading>
              <Text variant="small" className="mt-0.5 text-foreground">
                {item.company}
              </Text>
              <Text variant="muted" className="mt-3">
                {item.description}
              </Text>
              {item.technologies.length ? (
                <p className="mt-3 text-small text-muted-foreground">
                  {item.technologies.join(" · ")}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="interests-heading" className="space-y-5">
        <Heading as="h2" level={2} id="interests-heading">
          {labels.interests}
        </Heading>
        <ul className="max-w-2xl list-disc space-y-2 pl-5 marker:text-muted-foreground">
          {interests.map((interest) => (
            <li key={interest}>
              <Text variant="muted">{interest}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="principles-heading" className="space-y-8">
        <Heading as="h2" level={2} id="principles-heading">
          {labels.principles}
        </Heading>
        <ul className="max-w-2xl space-y-6">
          {principles.map((item) => (
            <li key={item.title}>
              <Heading as="h3" level={4}>
                {item.title}
              </Heading>
              <Text variant="muted" className="mt-2">
                {item.body}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

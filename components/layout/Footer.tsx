"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleProvider";
import { primaryNav } from "@/lib/navigation";
import { siteMetadata } from "@/lib/site-metadata";

const socialLinks = [
  {
    href: siteMetadata.githubUrl,
    labelKey: "github" as const,
    icon: (
      <path d="M12 .5a12 12 0 0 0-3.794 23.386c.6.111.819-.261.819-.579v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.833 2.807 1.303 3.492.997.108-.775.419-1.303.762-1.603-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.526.117-3.181 0 0 1.008-.322 3.302 1.23a11.52 11.52 0 0 1 6.01 0c2.293-1.552 3.3-1.23 3.3-1.23.653 1.655.242 2.878.119 3.181.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.623-5.48 5.921.43.37.814 1.102.814 2.222v3.293c0 .321.216.694.825.577A12 12 0 0 0 12 .5Z" />
    ),
  },
] as const;

/**
 * Site footer — semantic landmark, secondary nav, and social links.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="font-display text-sm font-medium text-foreground">
            {siteMetadata.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("footer.rights", { year, site: siteMetadata.title })}
          </p>
        </div>

        <Separator className="sm:hidden" />

        <nav aria-label="Footer" className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-foreground uppercase">
              {t("footer.explore")}
            </p>
            <ul className="flex flex-col gap-0.5">
              {primaryNav.map((item) => {
                const label = t(`nav.${item.labelKey}`);
                const className = cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "h-auto justify-start px-0 text-muted-foreground",
                );
                if (item.external) {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={className}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-foreground uppercase">
              {t("footer.connect")}
            </p>
            <ul className="flex flex-col gap-1.5">
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      {item.icon}
                    </svg>
                    {t(`footer.${item.labelKey}`)}
                  </a>
                </li>
              ))}
              {siteMetadata.contactEmail ? (
                <li>
                  <a
                    href={`mailto:${siteMetadata.contactEmail}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {siteMetadata.contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </Container>
    </footer>
  );
}

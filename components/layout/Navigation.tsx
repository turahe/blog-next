"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { primaryNav } from "@/lib/navigation";
import { useLocale } from "@/contexts/LocaleProvider";

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#") || href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationProps = {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  className?: string;
};

/**
 * Primary navigation links (DESIGN.md §9) using shadcn button styles.
 */
export function Navigation({
  orientation = "horizontal",
  onNavigate,
  className,
}: NavigationProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const vertical = orientation === "vertical";

  return (
    <nav
      aria-label="Primary"
      className={cn(
        vertical ? "flex flex-col gap-1" : "flex items-center gap-0.5",
        className,
      )}
    >
      {primaryNav.map((item) => {
        const label = t(`nav.${item.labelKey}`);
        const active = isActive(pathname, item.href);
        const linkClass = cn(
          buttonVariants({
            variant: active ? "secondary" : "ghost",
            size: vertical ? "default" : "sm",
          }),
          "justify-start font-normal",
          active ? "text-foreground" : "text-muted-foreground",
          !reduceMotion && !vertical && "hover:-translate-y-px",
        );

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              onClick={onNavigate}
            >
              {label}
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

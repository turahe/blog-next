"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommandPalette from "@/components/CommandPalette";
import DropMenu from "@/components/DropMenu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/layout/Container";
import { Navigation } from "@/components/layout/Navigation";
import { useLocale } from "@/contexts/LocaleProvider";
import { getCommandNavPages } from "@/lib/navigation";
import { siteMetadata } from "@/lib/site-metadata";

/**
 * Sticky site header — shadcn primitives + DESIGN.md §9 nav.
 */
export function Header() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const commandNavigation = useMemo(() => getCommandNavPages(t), [t]);
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setElevated(y > 16);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-[var(--duration-section)]",
        elevated
          ? "border-border bg-background/90 shadow-sm shadow-black/5"
          : "border-transparent bg-background/70",
      )}
    >
      <Container className="flex min-w-0 items-center justify-between gap-3 py-3.5 sm:gap-4">
        <motion.div
          className="min-w-0 shrink"
          whileHover={reduceMotion ? undefined : { scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <Link
            href="/"
            className="font-display truncate text-base font-medium tracking-tight text-foreground"
            aria-label={siteMetadata.title}
          >
            {siteMetadata.title}
          </Link>
        </motion.div>

        {/* Desktop nav from lg — md width can't fit 5 links + utilities without overflow */}
        <div className="hidden min-w-0 items-center gap-2 lg:flex xl:gap-3">
          <Navigation className="min-w-0" />
          <Separator orientation="vertical" className="mx-1 hidden h-4 xl:block" />
          <div className="flex shrink-0 items-center gap-1.5">
            <CommandPalette navigation={commandNavigation} />
            <LanguageToggle />
            <DropMenu />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <CommandPalette navigation={commandNavigation} />
          <LanguageToggle />
          <DropMenu />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={t("nav.menuOpen")}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{siteMetadata.title}</SheetTitle>
              </SheetHeader>
              <Navigation
                orientation="vertical"
                className="px-2"
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

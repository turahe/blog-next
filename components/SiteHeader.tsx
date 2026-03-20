"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Disclosure, Transition } from "@headlessui/react";
import { useState } from "react";
import CommandPalette from "@/components/CommandPalette";
import DropMenu from "@/components/DropMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteTitleTypewriter } from "@/components/SiteTitleTypewriter";
import { commandNavigation } from "@/lib/command-navigation";
import { siteMetadata } from "@/lib/site-metadata";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="inline-flex"
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 440, damping: 26 }}
    >
      <Link
        href={href}
        className="rounded-md px-2.5 py-1.5 text-sm font-normal text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function SiteHeader() {
  const [elevated, setElevated] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setElevated(y > 16);
  });

  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <motion.header
            className={`relative sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
              elevated
                ? "border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/92 dark:shadow-black/25"
                : "border-transparent bg-white/70 dark:bg-slate-900/70"
            }`}
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-12">
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                <Link
                  href="/"
                  className="text-base font-medium tracking-tight text-slate-900 dark:text-slate-100"
                  aria-label={siteMetadata.title}
                  title={siteMetadata.title}
                >
                  <SiteTitleTypewriter />
                </Link>
              </motion.div>

              <div className="hidden items-center gap-2 md:flex md:gap-3">
                <nav className="flex items-center gap-1 text-sm">
                  <NavLink href="/#skills">Skills</NavLink>
                  <NavLink href="/#work">Work</NavLink>
                  <NavLink href="/#about">About</NavLink>
                  <NavLink href="/#contact">Contact</NavLink>
                  <span className="mx-1 hidden h-3.5 w-px bg-slate-200/90 dark:bg-slate-600 xl:inline" aria-hidden />
                  {commandNavigation.pages.map((page) => (
                    <NavLink key={page.href} href={page.href}>
                      {page.name}
                    </NavLink>
                  ))}
                </nav>
                <CommandPalette navigation={commandNavigation} />
                <DropMenu />
                <ThemeToggle />
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <CommandPalette navigation={commandNavigation} />
                <DropMenu />
                <Disclosure.Button className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
                  {open ? "Close" : "Menu"}
                </Disclosure.Button>
                <ThemeToggle />
              </div>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-full left-0 right-0 z-[1] h-0.5 origin-left bg-gradient-to-r from-primary-500 via-violet-500 to-fuchsia-500 opacity-95 dark:from-primary-400 dark:via-violet-400 dark:to-fuchsia-400 dark:opacity-90"
              style={{ scaleX: scrollYProgress }}
            />
          </motion.header>

          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform opacity-0 -translate-y-1"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-1"
          >
            <Disclosure.Panel className="border-b border-slate-200/60 bg-white/95 px-5 py-3 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-900/95">
              <nav className="flex flex-col gap-0.5">
                {["/#skills", "/#work", "/#about", "/#contact"].map((href, i) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-md px-2 py-2 text-sm font-normal text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  >
                    {["Skills", "Work", "About", "Contact"][i]}
                  </Link>
                ))}
                {commandNavigation.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-md px-2 py-2 text-sm font-normal text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  >
                    {page.name}
                  </Link>
                ))}
              </nav>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

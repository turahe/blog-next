"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import useSound from "use-sound";
import clsx from "clsx";
import {
  ArchiveIcon,
  BarChartIcon,
  CalendarIcon,
  ChatBubbleIcon,
  CodeIcon,
  Cross1Icon,
  DiscIcon,
  DrawingPinIcon,
  EnterIcon,
  FrameIcon,
  HamburgerMenuIcon,
  HomeIcon,
  LaptopIcon,
  Link2Icon,
  Pencil1Icon,
  PersonIcon,
  QuoteIcon,
  RocketIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { authChangedEventName } from "@/lib/auth-cookies";
import { useLocale } from "@/contexts/LocaleProvider";
import { authService } from "@/services/auth.service";

function itemClass(focus: boolean) {
  return clsx(
    "block w-full px-4 py-2 text-left text-sm",
    focus
      ? "bg-slate-200 text-slate-900 dark:bg-slate-600 dark:text-slate-50"
      : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/95",
  );
}

export default function DropMenu() {
  const { t } = useLocale();
  const router = useRouter();
  const [playPageChange] = useSound("/static/sounds/page-change.mp3");
  const [authed, setAuthed] = useState(false);

  const syncAuth = useCallback(() => {
    setAuthed(!!authService.getAccessToken());
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      syncAuth();
    });
    const onAuthChanged = () => syncAuth();
    window.addEventListener(authChangedEventName, onAuthChanged);
    window.addEventListener("focus", syncAuth);
    return () => {
      window.removeEventListener(authChangedEventName, onAuthChanged);
      window.removeEventListener("focus", syncAuth);
    };
  }, [syncAuth]);

  const handleMenuButtonClick = () => {
    syncAuth();
    playPageChange();
  };

  const handleSignOut = () => {
    authService.clearTokens();
    setAuthed(false);
    router.refresh();
  };

  return (
    <Menu as="div" className="relative z-[110] inline-block text-left">
      {({ open }) => (
        <>
          <MenuButton
            type="button"
            aria-label="Toggle list menu"
            aria-expanded={open}
            className="ml-2 flex cursor-pointer items-center justify-center rounded-full border border-slate-300/90 bg-slate-100 p-1 transition-all hover:border-primary-400/50 hover:bg-slate-200/90 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-primary-500/40 dark:hover:bg-slate-700"
            onClick={handleMenuButtonClick}
          >
            <motion.span
              className="flex h-8 w-8 items-center justify-center p-2 text-slate-800 dark:text-slate-100"
              whileTap={{ scale: 0.5 }}
              transition={{ duration: 0.1, ease: "easeIn" }}
              aria-hidden
            >
              {open ? (
                <Cross1Icon className="h-4 w-4" />
              ) : (
                <HamburgerMenuIcon className="h-4 w-4" />
              )}
            </motion.span>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            modal={false}
            className="z-[120] w-56 origin-top-right divide-y divide-slate-200 rounded-md border border-slate-200/90 bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 [--anchor-gap:8px] focus:outline-none dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:shadow-black/30 dark:ring-white/10"
          >
            <div className="py-1">
              <MenuItem>
                {({ focus }) => (
                  <Link href="/" className={itemClass(focus)}>
                    <span className="flex flex-row items-center">
                      <HomeIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.home")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/posts" className={itemClass(focus)}>
                    <span className="flex flex-row items-center">
                      <Pencil1Icon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.blog")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Snippets"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <CodeIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.snippets")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/projects" className={itemClass(focus)}>
                    <span className="flex flex-row items-center">
                      <ArchiveIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.projects")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=About"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <PersonIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.about")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) =>
                  authed ? (
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className={itemClass(focus)}
                    >
                      <span className="flex flex-row items-center">
                        <span className="mr-2 inline-flex items-center">
                          {t("menu.signOut")}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <Link href="/auth/login" className={itemClass(focus)}>
                      <span className="flex flex-row items-center">
                        <EnterIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                        {t("menu.signIn")}
                      </span>
                    </Link>
                  )
                }
              </MenuItem>
            </div>

            <div className="py-1">
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Contact"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <Link2Icon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.contact")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/tags" className={itemClass(focus)}>
                    <span className="flex flex-row items-center">
                      <FrameIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.tags")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Guestbook"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <ChatBubbleIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.guestbook")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Uses"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <LaptopIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.uses")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Now"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <DiscIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.now")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Stats"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <BarChartIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.stats")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Journey"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <RocketIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.journey")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Recommends"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <DrawingPinIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.recommends")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Quotes"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <QuoteIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.quotes")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Activity"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <CalendarIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.activity")}
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/coming-soon?section=Tweets"
                    className={itemClass(focus)}
                  >
                    <span className="flex flex-row items-center">
                      <TwitterLogoIcon className="mr-4 mt-0.5 shrink-0" aria-hidden />
                      {t("menu.tweets")}
                    </span>
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}

"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import useSound from "use-sound";
import { FiCommand } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import type { CommandNavigation, CommandPage } from "@/lib/command-navigation";

function CommandPalette({ navigation }: { navigation: CommandNavigation }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [playOpen] = useSound("/static/sounds/open.mp3");

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered =
    query === ""
      ? navigation.pages
      : navigation.pages.filter((page) =>
          page.name.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <>
      <motion.button
        className="ml-2 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-300/90 bg-slate-100 p-1 text-slate-800 transition-all duration-200 ease-in-out hover:border-slate-400 hover:bg-slate-200/90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
        type="button"
        aria-label="Command palette"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ duration: 0.1, ease: "easeIn" }}
        onClick={() => {
          setIsOpen((o) => !o);
          playOpen();
        }}
      >
        <FiCommand className="h-4 w-4" aria-hidden />
      </motion.button>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog open={isOpen} onClose={close} className="relative z-[100]">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-slate-950/70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto p-4 pt-[15vh] sm:p-12 sm:pt-[20vh]">
            <div className="flex min-h-full items-start justify-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-xl transform">
                  <Combobox<CommandPage | null, false>
                    value={null}
                    onChange={(page) => {
                      if (!page) return;
                      close();
                      setQuery("");
                      router.push(page.href);
                    }}
                    by={(a, b) => (a && b ? a.href === b.href : a === b)}
                  >
                    <div className="relative mx-auto max-h-[50vh] max-w-xl divide-y divide-slate-200 overflow-hidden overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-100 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5 dark:divide-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:shadow-black/40 dark:ring-white/10">
                      <div className="flex items-center px-4">
                        <HiSearch
                          className="h-6 w-6 shrink-0 text-slate-500 dark:text-slate-400"
                          aria-hidden
                        />
                        <ComboboxInput
                          displayValue={() => query}
                          onChange={(event) => setQuery(event.target.value)}
                          className="h-12 w-full border-0 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:ring-0 focus:outline-none dark:text-slate-100 dark:placeholder-slate-500"
                          placeholder="Search..."
                          autoComplete="off"
                        />
                      </div>
                      {filtered.length > 0 ? (
                        <ComboboxOptions
                          hold
                          className="max-h-[min(40vh,20rem)] overflow-y-auto py-4 text-sm"
                        >
                          {filtered.map((page) => (
                            <ComboboxOption
                              key={`${page.href}-${page.name}`}
                              value={page}
                              className="cursor-pointer"
                            >
                              {({ focus }) => (
                                <div
                                  className={`space-x-1 px-14 py-2 ${
                                    focus
                                      ? "bg-slate-200 dark:bg-slate-600/90"
                                      : "bg-slate-100 dark:bg-slate-800"
                                  }`}
                                >
                                  <span className="font-medium text-slate-900 dark:text-slate-100">
                                    {page.name}
                                  </span>
                                  {page.repo ? (
                                    <span className="text-slate-500 dark:text-slate-400">
                                      {page.repo}
                                    </span>
                                  ) : null}
                                </div>
                              )}
                            </ComboboxOption>
                          ))}
                        </ComboboxOptions>
                      ) : null}
                      {query.length > 0 && filtered.length === 0 ? (
                        <p className="px-12 py-4 text-sm text-slate-500 dark:text-slate-400">
                          no results found
                        </p>
                      ) : null}
                    </div>
                  </Combobox>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CommandPalette;

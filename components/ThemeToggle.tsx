"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import useSound from "use-sound";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  const [playThemeSound] = useSound("/static/sounds/switch-on.mp3");

  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 shrink-0 rounded-full border border-slate-200 bg-slate-100 dark:border-slate-600 dark:bg-slate-800"
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300/90 bg-slate-100 text-slate-800 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-200/90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/20 dark:hover:border-slate-500 dark:hover:bg-slate-700/90"
      whileTap={{ scale: 0.92, rotate: isDark ? -12 : 12 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      onClick={() => {
        handleToggle();
        playThemeSound();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="h-4 w-4 fill-current"
        aria-hidden
      >
        {isDark ? (
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        ) : (
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        )}
      </svg>
    </motion.button>
  );
}

export default ThemeSwitch;
export { ThemeSwitch };
export { ThemeSwitch as ThemeToggle };

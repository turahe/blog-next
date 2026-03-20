export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/50 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© {year} Go Blog. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.794 23.386c.6.111.819-.261.819-.579v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.833 2.807 1.303 3.492.997.108-.775.419-1.303.762-1.603-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.526.117-3.181 0 0 1.008-.322 3.302 1.23a11.52 11.52 0 0 1 6.01 0c2.293-1.552 3.3-1.23 3.3-1.23.653 1.655.242 2.878.119 3.181.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.623-5.48 5.921.43.37.814 1.102.814 2.222v3.293c0 .321.216.694.825.577A12 12 0 0 0 12 .5Z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18.901 1.153h3.68l-8.042 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.474l8.599-9.826L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.49h2.04L6.486 3.245H4.298L17.61 20.643Z" />
            </svg>
            X
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.028-3.036-1.849-3.036-1.851 0-2.134 1.445-2.134 2.939v5.666H9.36V9h3.413v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.266 2.37 4.266 5.455v6.285ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771A1.772 1.772 0 0 0 0 1.771v20.458C0 23.203.797 24 1.771 24h20.451A1.774 1.774 0 0 0 24 22.229V1.771A1.774 1.774 0 0 0 22.225 0Z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

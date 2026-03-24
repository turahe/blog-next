# Go Blog

Portfolio and blog frontend built with the Next.js App Router. The homepage combines landing sections (hero, about, tech stack, featured work) with optional integration against a Go (or other) backend via a versioned REST API.

## Stack

- **Next.js** 16 · **React** 19 · **TypeScript**
- **Tailwind CSS** 4 (with `@tailwindcss/typography`, `@tailwindcss/forms`)
- **Motion** (animations), **next-themes** (dark mode), **axios** (API client)
- **Vitest** (unit tests), **Playwright** (E2E), **Husky** (git hooks)

## Prerequisites

- **Node.js** **25** (local and CI)
- npm (lockfile: `package-lock.json`)

If you use **nvm** or **fnm**, run `nvm use` / `fnm use` — the repo pins **Node 25** in [`.nvmrc`](.nvmrc).

## Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

   This runs the `prepare` script and installs [Husky](https://typicode.github.io/husky/) hooks when you commit from this clone.

2. **Environment variables** — create `.env.local` in the project root (not committed) and set:

   | Variable | Purpose |
   |----------|---------|
   | `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API (default in code: `http://localhost:8080/api/v1`) |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | Optional — public contact email for CTAs (`lib/site-metadata.ts`) |
   | `NEXT_PUBLIC_SITE_URL` | Optional — canonical site URL for metadata (defaults to `http://localhost:3000`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server ([http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest, single run) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | E2E tests (Playwright; starts mock API + `next dev` — see below) |
| `npm run test:e2e:ui` | Playwright UI mode |

### Tests

- **Unit:** `lib/**/*.test.ts` — run `npm test`.
- **E2E:** Playwright specs under `e2e/`. The first run needs browser binaries:

  ```bash
  npx playwright install chromium
  ```

  E2E uses `e2e/serve.mjs`: a small mock API on port **18080** and `NEXT_PUBLIC_API_BASE_URL` pointing at it so pages that fetch posts work without a real backend (avoids clashing with a local API on **8080**).

### Git hooks (Husky)

Pre-commit runs **`npm run lint`** and **`npm test`**. To skip a hook in an emergency: `git commit --no-verify` (use sparingly).

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on **push** and **pull request** to **`main`** and **`dev`**, and on **workflow_dispatch**. GitHub Actions uses **Node.js 25** (`actions/setup-node`). It:

1. Installs dependencies (`npm ci`)
2. **Snyk** Open Source scan (requires repo secret `SNYK_TOKEN`; skipped for PRs from forks)
3. Lint, unit tests, production build
4. Playwright Chromium install and E2E tests

Add **`SNYK_TOKEN`** in the repository’s **Settings → Secrets and variables → Actions** (token from [Snyk](https://snyk.io) account settings).

## Internationalization (EN / ID)

- UI copy lives in **`lib/i18n/messages/en.ts`** and **`lib/i18n/messages/id.ts`** (same keys).
- Locale is stored in the **`go-blog-locale`** cookie (`en` or `id`), read on the server for `<html lang>` and synced on the client via **`LocaleProvider`** (`contexts/LocaleProvider.tsx`).
- Use **`useLocale()`** for `t('path.to.key')`, `locale`, `setLocale`, and BCP‑47 **`dateLocale`** (for dates).
- Header **EN | ID** toggle: `components/LanguageToggle.tsx`.

## Project layout

- **`app/`** — App Router routes (`page.tsx`, layouts, API-facing pages: blog, posts, tags, projects, auth)
- **`sections/`** — Composed homepage sections (hero, about, tech stack, etc.)
- **`components/`** — Shared UI (backdrop, cards, motion helpers, …)
- **`lib/`** — Site metadata, API helpers, motion variants, utilities
- **`e2e/`** — Playwright specs and E2E dev server helper (`serve.mjs`)

Copy and SEO defaults for the marketing shell live in **`lib/site-metadata.ts`**.

## API

The app expects a backend compatible with the API shape used in `lib/` / client calls (OpenAPI spec in-repo: `swagger.json`). Point `NEXT_PUBLIC_API_BASE_URL` at your running server.

## Deploy

Deploy like any Next.js app — e.g. [Vercel](https://vercel.com) or your host of choice. Set env vars in the hosting dashboard before going live.

## Docs

- [Next.js documentation](https://nextjs.org/docs)

---

This project started from [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and has since grown into a full portfolio/blog surface.

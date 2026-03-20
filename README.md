# Go Blog

Portfolio and blog frontend built with the Next.js App Router. The homepage combines landing sections (hero, about, tech stack, featured work) with optional integration against a Go (or other) backend via a versioned REST API.

## Stack

- **Next.js** 16 · **React** 19 · **TypeScript**
- **Tailwind CSS** 4 (with `@tailwindcss/typography`, `@tailwindcss/forms`)
- **Motion** (animations), **next-themes** (dark mode), **axios** (API client)

## Prerequisites

- Node.js 20+ (recommended)
- npm, pnpm, yarn, or bun

## Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Environment variables — copy `.env.example` to `.env.local` and adjust:

   | Variable | Purpose |
   |----------|---------|
   | `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API (e.g. `http://localhost:8080/api/v1`) |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | Optional — public contact email for CTAs (`lib/site-metadata.ts`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server ([http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | ESLint |

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

Copy and SEO defaults for the marketing shell live in **`lib/site-metadata.ts`**.

## API

The app expects a backend compatible with the API shape used in `lib/` / client calls (OpenAPI spec in-repo: `swagger.json`). Point `NEXT_PUBLIC_API_BASE_URL` at your running server.

## Deploy

Deploy like any Next.js app — e.g. [Vercel](https://vercel.com) or your host of choice. Set env vars in the hosting dashboard before going live.

## Docs

- [Next.js documentation](https://nextjs.org/docs)

---

This project started from [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and has since grown into a full portfolio/blog surface.

# Architecture

## 1. Purpose

This document defines the frontend architecture for the personal blog and portfolio.

The application is built with:

* Next.js
* React
* TypeScript
* Tailwind CSS
* REST API backend
* Scroll World cinematic experience

The frontend is responsible for presentation, routing, SEO, rendering, and user interaction.

The backend REST API is the source of truth for dynamic content.

---

# 2. Architecture Overview

```text
                         ┌─────────────────────┐
                         │     REST API        │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                              HTTPS / JSON
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────┐
│                         Next.js                            │
│                                                            │
│  ┌──────────────┐      ┌──────────────────────────────┐   │
│  │ App Router   │─────▶│ Server Components             │   │
│  └──────────────┘      │                              │   │
│                        │ Blog / Projects / Profile    │   │
│                        └──────────────┬───────────────┘   │
│                                       │                   │
│                        ┌──────────────▼───────────────┐   │
│                        │ API Client / Data Layer      │   │
│                        └──────────────┬───────────────┘   │
│                                       │                   │
│             ┌─────────────────────────┼───────────────┐   │
│             │                         │               │   │
│             ▼                         ▼               ▼   │
│        Blog Pages              Project Pages      Profile │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Client Components                                  │   │
│  │ Navigation / Interactive UI / Scroll World         │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                               Web Browser
```

---

# 3. Architectural Principles

The application follows these principles:

1. Server Components by default.
2. Client Components only when required.
3. REST API is the source of truth.
4. UI components must not directly implement API calls.
5. SEO-critical content must be rendered server-side.
6. Scroll World is an enhancement layer.
7. Performance is a first-class requirement.
8. Components should remain reusable and focused.
9. API contracts should be typed.
10. Secrets must never be exposed to the browser.

---

# 4. Rendering Strategy

## Server Rendering

Use Server Components for:

* homepage content
* blog listing
* blog articles
* project listing
* project detail pages
* profile
* SEO metadata

Conceptual flow:

```text
Request
   ↓
Next.js Server
   ↓
REST API
   ↓
Transform/Validate Data
   ↓
React Server Component
   ↓
HTML
   ↓
Browser
```

---

# 5. Client Components

Use Client Components only when functionality requires browser execution.

Examples:

* mobile navigation
* interactive filters
* animations
* Scroll World
* client-side UI state
* browser APIs

Do not make an entire route a Client Component when only one child requires client-side behavior.

Preferred:

```text
Page Server Component
│
├── Header
│
├── Article
│
├── ProjectList
│
└── ScrollWorld Client Component
```

---

# 6. Data Flow

The data flow should follow:

```text
REST API
   ↓
API Client
   ↓
Validation / Mapping
   ↓
Server Component
   ↓
Presentation Component
```

Do not use:

```text
Component
   ↓
fetch()
   ↓
REST API
```

for every individual component.

API access should be centralized.

---

# 7. API Layer

Recommended structure:

```text
src/lib/api/
├── client.ts
├── blog.ts
├── projects.ts
├── profile.ts
└── types.ts
```

Responsibilities:

### `client.ts`

Responsible for:

* base URL
* headers
* request handling
* timeout
* error normalization
* response parsing

### `blog.ts`

Responsible for:

* blog list
* blog detail
* related articles

### `projects.ts`

Responsible for:

* project list
* project detail

### `profile.ts`

Responsible for:

* profile
* experience
* skills

Components must not contain raw API URLs.

---

# 8. Type Safety

All API responses should have TypeScript types.

Prefer generated types from OpenAPI when available.

Example:

```text
OpenAPI
   ↓
Generated Types
   ↓
API Client
   ↓
Next.js
```

Do not manually duplicate API models when generated types are available.

---

# 9. Content Source

Dynamic content comes from REST API.

The frontend repository should NOT contain the canonical versions of:

* blog posts
* projects
* biography
* experience
* skills

Static assets may still exist in:

```text
public/
```

The API remains the source of truth for content.

---

# 10. Routing

Use Next.js App Router.

Recommended routes:

```text
/
 /about
 /projects
 /projects/[slug]
 /blog
 /blog/[slug]
 /resume
 /contact
```

Routes should use human-readable slugs.

---

# 11. Blog Rendering

Blog article flow:

```text
/blog/[slug]
      ↓
Server Component
      ↓
GET /blog/posts/{slug}
      ↓
Article Data
      ↓
Metadata
      +
Article UI
```

Article content should be rendered as semantic HTML.

---

# 12. Project Rendering

Project detail flow:

```text
/projects/[slug]
       ↓
Server Component
       ↓
GET /projects/{slug}
       ↓
Project Data
       ↓
Project UI
```

---

# 13. Metadata Architecture

Metadata should be generated from the same API data used to render the page.

Conceptually:

```text
API
 │
 ├── generateMetadata()
 │
 └── Page()
```

Do not make separate API requests when the architecture allows reuse.

Metadata must remain available without client-side JavaScript.

---

# 14. Caching

Caching strategy should be determined per endpoint.

Possible strategies:

```text
Static content
    → long revalidation

Frequently updated content
    → short revalidation

Real-time content
    → dynamic request
```

Do not disable caching globally.

The API should expose cache semantics where possible.

Concrete Next.js revalidation durations live in `lib/api/cache.ts`:

```text
Blog listing / detail     → 60s   (tags: blog-posts, blog-post-{id|slug})
Projects listing / detail → 120s  (tags: projects, project-{slug})
Tags listing / detail     → 300s  (tags: tags, tag-{slug})
Profile / experience / skills → 300s
Auth / mutations          → no-store (dynamic)
```

Resource modules must use `apiCache` instead of hard-coding ad-hoc `revalidate` values.

---

# 15. Error Handling

API failures must not crash the entire website.

Provide:

```text
loading.tsx
error.tsx
not-found.tsx
```

where appropriate.

Expected cases:

```text
404 → not-found
401/403 → appropriate access handling
5xx → error state
timeout → retry/fallback
network failure → graceful error
```

---

# 16. Scroll World Architecture

Scroll World is isolated from content rendering.

Preferred:

```text
Homepage
│
├── Semantic Hero Content
│
├── ScrollWorld
│
└── Portfolio Content
```

Scroll World should not fetch blog/project data directly.

It receives only the data it actually needs.

---

# 17. Scroll World Failure

If Scroll World fails:

```text
ScrollWorld
     ↓
Static Hero
```

The rest of the homepage must remain functional.

---

# 18. Security

Never expose:

* API credentials
* private tokens
* backend secrets
* database credentials

to Client Components.

Public API endpoints may be called from the server.

Private backend credentials must remain server-side.

---

# 19. Environment Variables

Example:

```text
NEXT_PUBLIC_SITE_URL=
API_BASE_URL=
API_TOKEN=
```

Only variables explicitly intended for browser use may use:

```text
NEXT_PUBLIC_
```

Never expose backend credentials through `NEXT_PUBLIC_*`.

---

# 20. Folder Structure

Recommended:

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── blog/
│   ├── projects/
│   └── scroll-world/
│
├── lib/
│   ├── api/
│   ├── seo/
│   └── utils/
│
└── types/
```

---

# 21. Architecture Constraints

Do not:

* add a database to the frontend
* duplicate backend content
* create direct database access
* fetch APIs from every UI component
* make all components Client Components
* put business logic inside presentation components
* expose backend secrets
* make Scroll World responsible for page content

---

# 22. Definition of Done

Architecture is considered compliant when:

* API access is centralized
* API models are typed
* Server Components are the default
* SEO content is server-rendered
* Scroll World is isolated
* secrets remain server-side
* routes are predictable
* content comes from REST API
* error handling exists
* caching strategy is explicit

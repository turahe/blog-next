# API Contract

## 1. Purpose

This document describes how the Next.js frontend integrates with the **Blog Platform REST API**.

**Authoritative machine-readable contract:**

```text
docs/openapi.yaml
```

OpenAPI version: **3.1.0** · Contract version: **1.0.0**

Path operation details are split into:

```text
docs/contracts/
  posts.yaml
  tags.yaml
  categories.yaml
  comments.yaml
  auth.yaml
  users.yaml
  media.yaml
  analytics.yaml
  newsletter.yaml
  notifications.yaml
  admin.yaml
  health.yaml
```

Component schemas, parameters, and shared responses are declared in `docs/openapi.yaml` under `components` (via `$ref`). When those target files are present, they win over any human summary in this document.

The frontend must not invent endpoints, query names, or response shapes that contradict OpenAPI.

---

## 2. Servers & base URL

From OpenAPI `servers`:

| Environment | URL |
|-------------|-----|
| Local Docker Compose | `http://localhost:8080` |
| Production | `https://api.example.com` |

Frontend configuration:

```text
API_BASE_URL=
```

Fallback may exist for local tooling (`NEXT_PUBLIC_API_BASE_URL`), but **secrets and server credentials must never use `NEXT_PUBLIC_*`**.

Do not hardcode production URLs in application code.

Example absolute request:

```text
GET {API_BASE_URL}/api/v1/posts?page=1&per_page=10
```

---

## 3. Versioning

Public and authenticated application APIs use:

```text
/api/v1/...
```

Health probes are unversioned:

```text
/health/live
/health/ready
/health/version
```

Breaking changes require a version bump or coordinated migration.

---

## 4. Security

### 4.1 Default scheme

OpenAPI global security:

```yaml
security:
  - bearerAuth: []
```

Authenticated calls send:

```http
Authorization: Bearer <access_token>
```

### 4.2 Public (no auth)

Operations that set `security: []` are callable without a bearer token. Important public groups for this site:

* Posts, tags, categories, media read/transform
* Post SEO meta
* Public user profile
* Comments list / create (create also allows optional bearer)
* Newsletter subscribe / confirm / unsubscribe / preferences
* Analytics consent + ingest
* Auth login / refresh / password reset flows
* Health probes

### 4.3 Frontend credential rule

```text
Browser
  ↓
Next.js Server Component / Route Handler
  ↓
REST API (bearer or public)
```

Browser-facing pages that need elevated tokens must obtain them via Next.js server code or first-party cookie flows — never embed API admin secrets in client bundles.

---

## 5. Common response envelope

Responses use shared schema names from OpenAPI components:

| Schema | Role |
|--------|------|
| `Envelope` / `Envelope*` | Success wrapper around `data` (+ optional meta) |
| `EnvelopeEmpty` | Success with empty/ack payload |
| `EnvelopeError` | Error body |
| `Error` | Error object |
| `Meta` | Pagination / list metadata |

Conceptual success shape:

```json
{
  "code": 0,
  "message": "ok",
  "data": {},
  "meta": {
    "page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

Exact field names for `Meta` / envelopes must match OpenAPI schemas (`Meta`, `EnvelopePostList`, etc.). Do not assume cursor fields unless the schema defines them.

Conceptual error shape (`EnvelopeError` / `Error`):

```json
{
  "code": "RESOURCE_NOT_FOUND",
  "message": "Post not found"
}
```

(or nested under an `error` / envelope object — follow the registered `EnvelopeError` schema).

Frontend should normalize errors into one internal representation. Never show raw upstream stack traces to users.

---

## 6. Pagination

List endpoints use shared parameters:

| Parameter | In | Notes |
|-----------|----|--------|
| `page` | query | `$ref` → `Page` |
| `per_page` | query | `$ref` → `PerPage` (some admin lists use `PerPageMax100`) |

Prefer OpenAPI `Meta` for totals and page counts. Do not invent cursor pagination unless/until the contract adds it.

---

## 7. HTTP status codes

Shared response components map to:

| Status | OpenAPI response | Meaning |
|--------|------------------|---------|
| 200 | success / `EmptyOk` | OK |
| 201 | created | Resource created |
| 202 | accepted | Accepted (e.g. newsletter duplicate-safe flows) |
| 400 | `ValidationError` | Invalid request |
| 401 | `UnauthorizedError` | Unauthenticated |
| 403 | `ForbiddenError` | Forbidden |
| 404 | `NotFoundError` | Not found |
| 409 | conflict (inline) | Conflict (slug, race) |
| 429 | `TooManyRequests` | Rate limited |
| 500+ | — | Upstream failure |
| 503 | health ready failure | Dependency unhealthy |

---

## 8. Public content APIs (portfolio frontend)

These are the primary read models for blog pages.

### 8.1 List published posts

```http
GET /api/v1/posts
```

* **operationId:** `public.posts.list`
* **security:** none
* **query:** `page`, `per_page`, `category_id` (uuid), `tag_id` (uuid)
* **200:** `EnvelopePostList`

Example:

```text
/api/v1/posts?page=1&per_page=10&tag_id=<uuid>
```

Published-only. Draft / scheduled / archived belong under admin posts APIs.

### 8.2 Post detail by slug

```http
GET /api/v1/posts/{slug}
```

* **operationId:** `public.posts.get`
* **security:** none
* **query:** optional media include (`IncludePostMedia`)
* **200:** `EnvelopePostResponse`
* **404:** `NotFoundError`

### 8.3 Post SEO meta (SSR)

```http
GET /api/v1/posts/{slug}/seo-meta
```

* **operationId:** `public.posts.seo_meta`
* **security:** none
* **200:** `EnvelopePostSEOMetaPublic`
* **404:** `NotFoundError`

Returns structured title / description / OG / Twitter / robots payload for frontend metadata. Cached aggressively; invalidated on post or SEO updates.

### 8.4 Tags

```http
GET /api/v1/tags
```

* **operationId:** `public.tags.list`
* **200:** `EnvelopeTagList`

### 8.5 Categories

```http
GET /api/v1/categories
GET /api/v1/categories/{slug}
```

* **operationIds:** `public.categories.list`, `public.categories.get`
* Optional `IncludeCategoryImage`
* List **200:** `EnvelopeCategoryList`
* Detail **200:** `EnvelopeCategoryResponse` · **404:** not found

### 8.6 Public user profile

```http
GET /api/v1/users/{usernameOrId}
```

* **operationId:** `public.users.profile`
* **query:** `include` — comma-separated: `avatar`, `posts_preview`, `roles_brief`
* Respects privacy settings; private/missing users return **404** (no existence leak)
* **200:** `EnvelopePublicUserProfile`

### 8.7 Media

```http
GET /api/v1/media/{id}
GET /api/v1/media/{id}/transform
```

* **operationIds:** `public.media.get`, `public.media.transform`
* Transform supports sizing query params (`w`, `h`, `fit`, … — see `docs/contracts/media.yaml`)
* Treat returned URLs as remote assets; configure Next.js `images` accordingly

---

## 9. Canonical resource schemas (names)

Use generated or hand-synced TypeScript types keyed to OpenAPI schema names. Do not treat the following as full field contracts — open the `$ref` targets when generating types.

| Schema | Domain |
|--------|--------|
| `Post` | Published / admin post record |
| `PostCreateRequest` / `PostUpdateRequest` | Admin mutations |
| `PostSEOMetaPublic` / `PostSEOConfig` | SEO |
| `PostRevision` | Revision history |
| `PostMediaItem` | Post ↔ media |
| `Tag` / `TagCreateRequest` / `TagUpdateRequest` / `TagMergeRequest` | Tags |
| `Category` / create / update / move requests | Categories |
| `Comment` / `CommentCreateRequest` / … | Comments |
| `MediaAsset` / `MediaUploadRequest` | Media |
| `PublicUserProfile` / `User` / `UserSocialLinks` | Users |
| `TokenPair` / `LoginRequest` | Auth |
| `NewsletterSubscriber` / subscribe & preference requests | Newsletter |
| `Analytics*Request` | Consent & ingest |

Example conceptual post usage (field set must match `Post`):

```typescript
// Conceptual — regenerate from OpenAPI; do not hand-edit as source of truth
type Post = {
  id: string // uuid
  slug: string
  title: string
  // …status, body, seo, tags, category, media, timestamps per schema
}
```

---

## 10. Comments

### Public / optional auth

```http
GET  /api/v1/posts/{id}/comments
POST /api/v1/posts/{id}/comments
GET  /api/v1/comments/{id}
POST /api/v1/comments/{id}/flag
```

List query highlights: `page`, `per_page`, `sort` (`newest` | `oldest` | `most_upvoted` | `most_replied`), `tree_depth` (1–5, default 3).

Create may be anonymous (name/email) or authenticated; spam / honeypot / Turnstile rules apply (`docs/contracts/comments.yaml`).

### Authenticated self-service

```http
PATCH  /api/v1/comments/{id}
DELETE /api/v1/comments/{id}
POST   /api/v1/comments/{id}/upvote
GET    /api/v1/me/comments
```

### Admin moderation

```http
GET    /api/v1/admin/comments
GET    /api/v1/admin/comments/{id}
DELETE /api/v1/admin/comments/{id}
POST   /api/v1/admin/comments/{id}/moderate
POST   /api/v1/admin/comments/bulk-moderate
GET    /api/v1/admin/comments/stats
```

---

## 11. Authentication & password flows

```http
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
POST /api/v1/auth/2fa/challenge
POST /api/v1/auth/oauth/{provider}/callback
POST /api/v1/auth/password/forgot
GET  /api/v1/auth/password/reset/{token}
POST /api/v1/auth/password/reset
POST /api/v1/admin/auth/login
```

* Login / refresh / password reset entry points are public (`security: []`) where marked in contract.
* Successful login/refresh return `EnvelopeTokenResponse` (`TokenPair`).
* Logout and 2FA challenge require / issue session-scoped auth as documented in `docs/contracts/auth.yaml`.

---

## 12. Self-service (`/api/v1/me`)

Bearer-authenticated current-user surface (tag: **Self-Service** / related):

```text
GET/PATCH  /api/v1/me
PATCH      /api/v1/me/profile
POST/DELETE /api/v1/me/avatar
POST       /api/v1/me/password
POST       /api/v1/me/email/request-change
POST       /api/v1/me/email/confirm-change
GET/PATCH  /api/v1/me/privacy
GET        /api/v1/me/activity
POST       /api/v1/me/activity/export
POST       /api/v1/me/activity/erase
GET/POST   /api/v1/me/notifications…
GET        /api/v1/me/newsletter/subscriptions
POST       /api/v1/me/newsletter/subscribe
POST       /api/v1/me/newsletter/unsubscribe
GET        /api/v1/me/comments
```

Some high-risk actions require step-up headers (`X-Re-Verify-Password`, `X-2FA-Verified`, CSRF) — see shared parameters in OpenAPI.

---

## 13. Newsletter (public)

```http
POST /api/v1/newsletter/subscribe
POST /api/v1/newsletter/confirm
POST /api/v1/newsletter/confirm/resend
POST /api/v1/newsletter/unsubscribe
GET/PATCH /api/v1/newsletter/preferences/{token}
```

Subscribe is double-opt-in and enumeration-safe (201 vs 202). Details: `docs/contracts/newsletter.yaml`.

Admin newsletter, issues, and ESP config live under `/api/v1/admin/newsletter/...`.

---

## 14. Analytics consent & ingest (public)

```http
POST   /api/v1/analytics/consent
GET    /api/v1/analytics/consent/{token}
DELETE /api/v1/analytics/consent/{token}
POST   /api/v1/analytics/ingest/page-view
POST   /api/v1/analytics/ingest/time-spent
POST   /api/v1/analytics/ingest/navigation
POST   /api/v1/analytics/ingest/search
POST   /api/v1/analytics/ingest/search-click
```

Only ingest when consent allows. Admin dashboards/export/stream are under `/api/v1/admin/analytics/...`.

---

## 15. Health

```http
GET /health/live
GET /health/ready
GET /health/version
```

No bearer auth. Use for deploy probes — not for product UI.

---

## 16. Admin API catalog

All admin routes require bearer auth (and often RBAC / 2FA step-up). Path inventory from OpenAPI:

| Area | Base paths |
|------|------------|
| Users | `/api/v1/admin/users`, `.../{id}/profile`, `.../password/admin-reset`, `.../activity` |
| Posts | `/api/v1/admin/posts`, publish, media, revisions, seo |
| Tags | `/api/v1/admin/tags`, merge |
| Categories | `/api/v1/admin/categories`, move |
| Media | `/api/v1/admin/media`, complete, tags |
| Settings | `/api/v1/admin/settings`, history |
| Impersonation | `/api/v1/admin/impersonation/{start,stop,current}` |
| Analytics | overview, pages, navigation, retention, search, realtime stream, export |
| Comments | list, moderate, bulk-moderate, stats |
| Newsletter | subscribers, issues, provider-config |
| Auth | `/api/v1/admin/auth/login` |

Prefer linking to `docs/openapi.yaml` + `docs/contracts/admin.yaml` (and domain contracts) for request/response schemas rather than duplicating every admin field here.

---

## 17. Frontend API client rules

Centralize access:

```text
lib/api/
```

Preferred usage:

```typescript
const list = await blogApi.getPosts({ page: 1, perPage: 10 })
const post = await blogApi.getPostBySlug(slug)
```

Avoid raw fetches inside page/UI components:

```typescript
// Avoid in presentation components
fetch(`${API_BASE_URL}/api/v1/posts/${slug}`)
```

### Timeouts & retries

* Every outbound call must use a timeout.
* Do not retry `400`, `401`, `403`, `404`.
* Transient `502` / `503` / `504` may retry per policy.

### Validation

Prefer OpenAPI-generated types and/or runtime validation (Zod). TypeScript types alone do not validate JSON at runtime.

### Caching

Configure Next.js `revalidate` / cache tags **per endpoint class** (list vs detail vs profile). Document concrete TTLs in `architecture.md` or code (`lib/api/cache.ts`).

### Draft / publication state

Public `GET /api/v1/posts` returns published content only. Never render admin draft/scheduled posts on public, indexable routes.

### Slugs

Use API slugs as canonical route identifiers (`/posts/{slug}`). Slugs must stay stable, URL-safe, and unique.

### SEO

Prefer `GET /api/v1/posts/{slug}/seo-meta` (or equivalent fields on the post payload) for:

```text
title · description · canonical · OG/Twitter · robots
```

### Media

Do not vendor API media into the git repo. Configure remote image patterns for transform and CDN URLs.

### Scroll World

Do not issue extra API fan-out solely for animation. Reuse page data / static config.

---

## 18. OpenAPI workflow

```text
docs/openapi.yaml  (+ docs/contracts/*)
        ↓
Generated TypeScript types (optional)
        ↓
lib/api/* client & mappers
        ↓
Next.js pages / Route Handlers
```

Recommended change process:

1. Update OpenAPI / contract YAML.
2. Regenerate or sync frontend types.
3. Update API client & mappers.
4. Update affected routes/components.
5. Run `typecheck`, tests, and `build`.
6. Verify affected public pages (metadata, drafts gated, pagination).

Do not silently adapt to breaking contract changes in UI code.

---

## 19. Out of contract (this OpenAPI)

The following portfolio concepts are **not** defined in `docs/openapi.yaml` and must not be documented as if they were backend contract:

```text
/api/v1/projects
/api/v1/projects/{slug}
/api/v1/profile
/api/v1/experience
/api/v1/skills
/api/v1/blog/posts   ← superseded by /api/v1/posts
```

Until the backend publishes those paths in OpenAPI, the frontend should use static content, optional env-backed fallbacks, or explicitly marked temporary adapters — never pretend they are part of this contract.

---

## 20. Definition of done

API integration matches this contract when:

* `docs/openapi.yaml` is treated as source of truth
* all HTTP access goes through `lib/api/*`
* types and mappers align with OpenAPI schema names
* public vs bearer routes match `security` declarations
* pagination uses `page` / `per_page` (+ `Meta`) as specified
* errors, timeouts, and caching are intentional
* draft/admin content never appears on public SEO routes
* secrets stay server-side
* contract changes follow the workflow in §18

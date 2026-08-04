# Deployment

## 1. Purpose

This document defines how to deploy the Next.js blog and portfolio to **Vercel**.

Vercel is the primary production platform:

* Next.js-native builds
* Preview deployments per branch / PR
* Production deploys from the production Git branch
* Global CDN for static assets
* Instant rollback to a previous deployment

Other hosts (plain Node, Docker) are out of scope unless explicitly reintroduced.

Related:

```text
docs/api.md          → API base URL & contract
docs/architecture.md → runtime & caching context
.env.example         → environment variable catalog
package.json         → build / deploy scripts
```

---

## 2. Deployment architecture

```text
GitHub / Git remote
      ↓
Vercel Git integration (or CLI deploy)
      ↓
npm run build  (Next.js production build)
      ↓
Vercel deployment
  ├─ Edge / CDN  → static assets, cached HTML where applicable
  └─ Node (server) → SSR / RSC / Route Handlers
      │
      └──────────→ REST API (API_BASE_URL)
```

Browser clients never receive server secrets. Public `NEXT_PUBLIC_*` values are inlined at build time.

---

## 3. Environments

| Vercel environment | Typical use | Git trigger |
|--------------------|-------------|-------------|
| **Development** | Local `npm run dev` | — |
| **Preview** | PR / feature branch | Non-production branches |
| **Production** | Live site | Production branch (usually `main`) |

Configure env vars separately for Preview and Production in the Vercel project settings.

---

## 4. Prerequisites

1. Vercel account (personal or team).
2. Repository pushed to GitHub/GitLab/Bitbucket (recommended).
3. Backend API reachable over HTTPS from Vercel’s network.
4. Node compatible with the project (`package.json` / Next.js 16).

Local tooling (optional but useful):

```bash
npm i -g vercel
# or one-shot:
npm run deploy:vercel
```

Authenticate:

```bash
vercel login
vercel whoami
```

---

## 5. Connect the project (recommended: Git)

### 5.1 Dashboard import

1. Open [vercel.com/new](https://vercel.com/new).
2. Import this repository.
3. Framework preset: **Next.js** (auto-detected).
4. Root directory: repository root.
5. Build settings (defaults are correct for this app):

| Setting | Value |
|---------|--------|
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output | Next.js (managed) |
| Node.js Version | Project / Vercel default compatible with Next 16 |

6. Add environment variables (§6) **before** the first Production deploy when possible.
7. Deploy.

### 5.2 CLI link (existing repo)

```bash
# From repo root — prefer repo link when a git remote exists
vercel link --repo
# or single-project:
vercel link
```

Creates `.vercel/` (gitignored). Containing `project.json` or `repo.json` means the directory is linked.

Team scope (if needed):

```bash
vercel link --repo --scope <team-slug>
```

---

## 6. Environment variables

Source of truth for local names: `.env.example`.

Set the same keys in Vercel → Project → **Settings → Environment Variables**, scoped to Preview / Production as appropriate.

### 6.1 Required for a working deploy

| Name | Scope | Notes |
|------|--------|------|
| `API_BASE_URL` | Server (Production + Preview) | Prefer this for SSR. Example: `https://api.example.com/api/v1`. **Do not** use `localhost` on Vercel. |
| `NEXT_PUBLIC_API_BASE_URL` | Build + client | Browser auth / client fetches; also SSR fallback if `API_BASE_URL` unset. Must be a publicly reachable API URL. |
| `NEXT_PUBLIC_SITE_URL` | Build + client | Canonical origin for metadata, OG, absolute links. Example: `https://www.example.com`. Strongly recommended for Production. |

If `NEXT_PUBLIC_SITE_URL` is omitted, `lib/site-url.ts` falls back to `https://${VERCEL_URL}` (Vercel-provided host). That is fine for Preview; **Production** should use your stable custom domain.

### 6.2 Optional

| Name | Purpose |
|------|---------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact CTAs |
| `NEXT_PUBLIC_PROFILE_IMAGE` | About / homepage portrait override |

### 6.3 Rules

* Only browser-safe values use `NEXT_PUBLIC_`.
* Never put API admin tokens, private keys, or cookie secrets in `NEXT_PUBLIC_*`.
* After changing `NEXT_PUBLIC_*`, **redeploy** so the build picks up new inlined values.
* Use Vercel’s encrypted env store — do not commit `.env`, `.env.local`, or `.env.production`.

### 6.4 Example Production values

```text
API_BASE_URL=https://api.example.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1
NEXT_PUBLIC_SITE_URL=https://example.com
```

---

## 7. Build & local production check

Package manager for this repo: **npm**.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start   # optional local smoke of the production build
```

Vercel runs `npm run build` in the cloud. A failed build blocks the deployment.

---

## 8. Deploy workflows

### 8.1 Git push (preferred)

With Git integration linked:

```text
feature branch → Preview URL
main (production branch) → Production URL
```

1. Push commits.
2. Open the deployment in the Vercel dashboard or check Git commit status.
3. Preview deployments get unique URLs; Production uses the project Production domain.

Do not push from tooling without explicit permission to push.

### 8.2 CLI preview deploy

```bash
vercel deploy -y --no-wait
```

Returns a deployment URL immediately; inspect status with:

```bash
vercel inspect <deployment-url>
```

### 8.3 CLI production deploy

Only when intentionally promoting to Production:

```bash
vercel deploy --prod -y --no-wait
# or:
npm run deploy:vercel -- --prod
```

Prefer promoting a known-good Preview deployment in the dashboard when possible.

### 8.4 List recent deployments

```bash
vercel ls
```

---

## 9. Domains & HTTPS

1. Vercel → Project → **Settings → Domains**.
2. Add the production hostname (e.g. `example.com`, `www.example.com`).
3. Follow DNS instructions (A / CNAME / nameservers).
4. HTTPS certificates are provisioned automatically.

Align:

```text
NEXT_PUBLIC_SITE_URL
canonical URLs
sitemap / robots
Open Graph absolute URLs
```

with the same production origin.

---

## 10. API connectivity from Vercel

The Next.js server (SSR / RSC) must reach `API_BASE_URL`:

* Public HTTPS endpoint (or private networking if you use advanced Vercel networking)
* Correct TLS
* Firewall / allowlists that permit Vercel egress (or use a public API)
* Timeouts handled in `lib/api/client.ts`

Verify after deploy:

* Homepage / posts listing loads data (or empty-state with healthy error handling)
* Post detail SSR succeeds for a known slug
* Auth browser calls use `NEXT_PUBLIC_API_BASE_URL` when applicable

---

## 11. CDN, assets & Scroll World

Vercel serves Next.js static assets and `public/` through its CDN.

* Prefer assets under `public/` (images, posters, future `public/scroll-world/`).
* Do not bundle large videos into the JS graph.
* Immutable `/_next/static/*` assets are long-cacheable by platform default.
* Dynamic HTML follows Next.js `revalidate` / route caching — see architecture and `lib/api/cache.ts`.

---

## 12. CI expectations

Minimum quality gate before Production:

```text
Install → Lint → Typecheck → Test → Build → Deploy
```

Options:

* Rely on Vercel build + GitHub Checks.
* Add a CI workflow that runs `lint` / `typecheck` / `test` and only merge when green; Vercel still builds on push.

A failed Vercel build must not be promoted to Production.

---

## 13. Rollback

Vercel keeps prior deployments:

1. Dashboard → **Deployments**.
2. Open a previous successful Production deployment.
3. **Promote to Production** / Instant Rollback.

Always keep a known-good Production deployment before risky releases.

---

## 14. Monitoring

Enable as available on the plan:

* Deployment / build failure notifications
* Runtime logs for SSR and Route Handlers
* Vercel Analytics / Speed Insights (Core Web Vitals) when useful
* Upstream API error rates (backend monitoring)

Watch for:

* build failures
* SSR timeouts to `API_BASE_URL`
* spikes in 5xx on dynamic routes

---

## 15. Secrets & `.vercel/`

Never commit:

```text
.env
.env.local
.env.production
.vercel/          # local link metadata (usually gitignored)
API tokens
private keys
```

Use Vercel Environment Variables / team secrets for production values.

---

## 16. Post-deploy validation

### Application

* [ ] Production / Preview URL loads
* [ ] Navigation works
* [ ] `/posts` and article detail work
* [ ] `/about`, `/projects` load as designed
* [ ] `not-found` / error UI behave

### API

* [ ] `API_BASE_URL` reaches the backend from Vercel
* [ ] Empty / error API states do not crash the page

### SEO / domain

* [ ] `NEXT_PUBLIC_SITE_URL` matches the public hostname
* [ ] Metadata / Open Graph absolute URLs look correct
* [ ] Sitemap / robots reachable when implemented

### UX

* [ ] Mobile viewport
* [ ] Reduced motion
* [ ] Scroll World / hero fallback when present

### Performance

* [ ] Production Lighthouse or Vercel Speed Insights on key routes
* [ ] LCP / INP / CLS within target

---

## 17. Production checklist

```text
[ ] Repo linked to Vercel (Git integration preferred)
[ ] npm run build succeeds locally
[ ] API_BASE_URL set (non-localhost) for Production + Preview
[ ] NEXT_PUBLIC_API_BASE_URL set for Production + Preview
[ ] NEXT_PUBLIC_SITE_URL set to canonical Production origin
[ ] Custom domain + HTTPS active
[ ] Preview deploy smoke-tested
[ ] Production deploy smoke-tested
[ ] Rollback path understood
[ ] No secrets in git or NEXT_PUBLIC_*
[ ] Monitoring / notifications configured as needed
```

---

## 18. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Build fails on Vercel | Lint / TS / missing peer | Replicate with `npm run build` locally; check Node version |
| Pages empty / API errors | `API_BASE_URL` still localhost or wrong path | Set Production/Preview env to `https://…/api/v1` and redeploy |
| Wrong OG / canonical host | Missing `NEXT_PUBLIC_SITE_URL` | Set Production site URL to custom domain; redeploy |
| Client auth hits wrong API | Stale `NEXT_PUBLIC_API_BASE_URL` | Update env and **redeploy** (build-time inline) |
| Preview OK, Production broken | Env only scoped to Preview | Copy vars to Production environment |

---

## 19. Definition of done

Deployment is complete when:

* the app is linked and building on Vercel
* Production uses the correct `API_BASE_URL` and canonical `NEXT_PUBLIC_SITE_URL`
* HTTPS and the production domain are active
* Preview and Production smoke tests pass
* secrets are not exposed to the client
* a prior deployment can be rolled back instantly
* monitoring is sufficient to detect build and runtime failures

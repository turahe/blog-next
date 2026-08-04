# SEO

## 1. Purpose

This document defines the SEO architecture for the personal blog and portfolio.

SEO-critical content comes from the REST API but must be rendered into semantic HTML by Next.js.

---

# 2. SEO Architecture

```text
REST API
   ↓
Next.js Server
   ├── Page Content
   └── generateMetadata()
          ↓
      Search Engine
```

SEO must not depend on client-side JavaScript or Scroll World.

---

# 3. Canonical Domain

Production canonical domain:

```text
NEXT_PUBLIC_SITE_URL=
```

Example:

```text
https://example.com
```

Do not hardcode multiple production domains.

---

# 4. Indexable Routes

Public routes:

```text
/
 /about
 /projects
 /projects/[slug]
 /blog
 /blog/[slug]
```

Potentially indexable:

```text
/resume
```

depending on the final product requirements.

---

# 5. Non-Indexable Routes

Internal/private routes should not be indexed.

Examples:

```text
/admin
/preview
/internal
```

Draft content must not be indexed.

---

# 6. Page Titles

Every public page must have a unique title.

Examples:

```text
Homepage
Software Engineer — Backend, Systems & Web Development

Blog
Engineering Notes & Articles

Project
Project Name — Case Study

Article
Article Title
```

Avoid keyword stuffing.

---

# 7. Descriptions

Descriptions should be:

* unique
* descriptive
* useful
* related to page content

Blog descriptions should come from the API where available.

---

# 8. Blog Metadata

Each article should provide:

```text
title
description
publishedAt
updatedAt
author
coverImage
slug
```

These fields are used for:

* title
* description
* Open Graph
* Article structured data
* canonical URL

---

# 9. Project Metadata

Projects should provide:

```text
title
description
coverImage
slug
```

These fields are used to generate project metadata.

---

# 10. Canonical URLs

Canonical URL pattern:

```text
https://example.com/blog/{slug}
```

Project:

```text
https://example.com/projects/{slug}
```

Canonical URLs must not contain tracking parameters.

---

# 11. Open Graph

Each public page should define:

```text
og:title
og:description
og:url
og:image
```

Blog articles should preferably have article-specific images.

Recommended image size:

```text
1200 × 630
```

---

# 12. Structured Data

Recommended schemas:

```text
Person
WebSite
Article
BreadcrumbList
```

Use only schemas that accurately describe visible content.

Do not generate fake information.

---

# 13. Person Schema

The homepage may expose:

```text
name
url
image
jobTitle
sameAs
knowsAbout
```

Only use verified information from the portfolio.

---

# 14. Article Schema

Blog articles should use an appropriate article schema.

Conceptual fields:

```text
headline
description
image
datePublished
dateModified
author
mainEntityOfPage
```

The values must match the visible article.

---

# 15. Breadcrumbs

Recommended:

```text
Home
 └── Blog
      └── Article
```

and:

```text
Home
 └── Projects
      └── Project
```

Breadcrumb structured data should match the visible hierarchy.

---

# 16. Sitemap

Generate sitemap through Next.js.

Include:

```text
homepage
about
blog
published blog posts
projects
published project pages
```

Exclude:

```text
drafts
private routes
preview routes
```

---

# 17. Robots

Robots should:

* allow public pages
* block private routes
* reference sitemap

Never accidentally deploy:

```text
Disallow: /
```

to production.

---

# 18. Internal Linking

Blog articles should link to relevant:

* articles
* projects
* profile
* technical topics

Projects should link to relevant:

* articles
* repositories
* related projects

Use descriptive anchor text.

---

# 19. Semantic HTML

Important content must use semantic HTML.

Article:

```html
<article>
  <header>
    <h1>Article Title</h1>
  </header>

  <div>
    Article content
  </div>
</article>
```

Do not place critical SEO content only in:

* Canvas
* WebGL
* video
* images
* Scroll World

---

# 20. Scroll World SEO

Scroll World is decorative/storytelling content.

The following must exist independently:

```text
H1
Introduction
Primary CTA
Navigation
Project links
Blog links
```

Search engines must be able to understand the page without executing the cinematic experience.

---

# 21. Draft Content

Draft articles must not be publicly indexable.

Preferred:

```text
draft = true
    ↓
not included in sitemap
    ↓
not publicly rendered
```

If preview functionality is required, preview routes must use appropriate noindex behavior and access control.

---

# 22. Pagination

If pagination exists:

```text
/blog
/blog/page/2
/blog/page/3
```

Each page should expose crawlable links to other pages.

Do not make infinite scroll the only way to discover articles.

---

# 23. Images

Images should have meaningful alt text.

Alt text should describe the image.

Do not use keyword stuffing.

Decorative images may use empty alt text.

---

# 24. API Dependency

SEO metadata must be generated from the REST API data on the server.

Do not:

```text
Browser
 ↓
fetch API
 ↓
generate SEO
```

Prefer:

```text
Next.js Server
 ↓
REST API
 ↓
generateMetadata()
```

---

# 25. SEO Performance

SEO and performance must be considered together.

Avoid:

* blocking metadata generation on unnecessary APIs
* huge hero assets
* client-only content
* excessive JavaScript
* Scroll World blocking first render

---

# 26. Validation

For each public page verify:

```text
[ ] title
[ ] description
[ ] canonical
[ ] Open Graph
[ ] semantic H1
[ ] structured data where appropriate
[ ] crawlable links
[ ] correct sitemap inclusion
[ ] correct robots behavior
```

---

# 27. Production SEO Validation

After deployment verify:

```text
/robots.txt
/sitemap.xml
```

Also inspect:

* page source
* generated metadata
* canonical
* structured data
* Open Graph
* indexability

---

# 28. Definition of Done

SEO implementation is complete when:

* public pages have unique metadata
* metadata comes from correct API data
* canonical URLs are consistent
* sitemap is correct
* robots is correct
* structured data is accurate
* articles are crawlable
* projects are crawlable
* drafts are excluded
* semantic HTML exists
* Scroll World does not contain SEO-critical content
* production URLs are correct

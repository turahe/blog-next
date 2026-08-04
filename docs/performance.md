# Performance

## 1. Purpose

This document defines project-specific performance requirements.

Performance is especially important because the website includes a cinematic Scroll World experience.

The visual experience must never compromise the usability of the website.

---

# 2. Performance Priorities

Priority order:

```text
Content rendering
     ↓
Core Web Vitals
     ↓
Interaction responsiveness
     ↓
Scroll smoothness
     ↓
Animation quality
     ↓
Decorative effects
```

---

# 3. Core Web Vitals Targets

Target:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

These should be evaluated using realistic production conditions.

---

# 4. Rendering

Prefer:

```text
Server Components
```

for:

* blog
* projects
* profile
* homepage content

Avoid unnecessary hydration.

---

# 5. Client JavaScript

Client JavaScript should be minimized.

Before adding a client dependency:

1. Verify it is necessary.
2. Check bundle impact.
3. Determine whether it can be server-side.
4. Determine whether dynamic import is appropriate.

---

# 6. Scroll World

Scroll World is the largest performance risk.

It must:

* initialize lazily where practical
* avoid blocking first render
* load only necessary assets
* provide a static fallback
* simplify on mobile
* respect reduced motion

---

# 7. Asset Loading

Preferred:

```text
Initial HTML
   ↓
Hero content
   ↓
Hero poster
   ↓
Scroll World initialization
   ↓
Current scene
   ↓
Next scene
```

Do not load all scenes immediately.

---

# 8. Video

Video should be optimized for:

* resolution
* codec
* bitrate
* duration
* file size

Use appropriate formats such as:

```text
WebM
MP4
```

where required.

---

# 9. Mobile

Mobile should preferably use:

```text
static poster
```

or a lightweight animation.

Do not force desktop video to mobile devices when unnecessary.

---

# 10. Images

All images should:

* have known dimensions
* use optimized formats
* use responsive sizes
* lazy-load when appropriate

Use Next.js image optimization.

---

# 11. Fonts

Minimize:

* font families
* font weights
* font variants

Use Next.js font optimization.

---

# 12. LCP

The LCP element should not depend on Scroll World initialization.

Potential LCP:

```text
Hero heading
Hero poster
Hero image
```

The hero must be visually meaningful before heavy animation loads.

---

# 13. CLS

Prevent layout shifts by reserving space for:

* images
* video
* fonts
* dynamic content
* navigation

---

# 14. INP

Avoid long-running browser tasks.

Animation handlers must not block user interaction.

Avoid expensive synchronous work inside:

* scroll events
* pointer events
* click handlers

---

# 15. Scroll Performance

Scroll animation should use:

```text
requestAnimationFrame
```

where appropriate.

Prefer GPU-friendly properties:

```text
transform
opacity
```

Avoid repeatedly triggering layout calculations.

---

# 16. Lazy Loading

Lazy-load:

* below-the-fold images
* heavy interactive components
* Scroll World scenes
* non-critical third-party scripts

Do not lazy-load critical content unnecessarily.

---

# 17. Bundle Analysis

When performance issues are suspected, inspect:

* client bundle
* dependencies
* animation libraries
* icon libraries
* syntax highlighting
* duplicate packages

Do not optimize based solely on assumptions.

---

# 18. Third-Party Scripts

Keep third-party scripts to a minimum.

Analytics should not block rendering.

Every third-party script must have a documented reason.

---

# 19. Performance Testing

Test production builds:

```bash
pnpm build
pnpm start
```

Then evaluate:

* Lighthouse
* browser performance tools
* Core Web Vitals
* mobile throttling
* CPU throttling

---

# 20. Performance Budget

Initial project targets:

```text
LCP:
< 2.5s

INP:
< 200ms

CLS:
< 0.1

Hero image:
preferably < 300 KB

Non-critical images:
lazy loaded

Scroll World:
deferred

Third-party scripts:
minimal
```

Budgets should be reviewed using actual measurements.

---

# 21. Failure Strategy

If Scroll World causes unacceptable performance:

```text
Full experience
      ↓
Reduced experience
      ↓
Static experience
```

The website must remain usable at every stage.

---

# 22. Performance Checklist

```text
[ ] Server Components used by default
[ ] Client Components minimized
[ ] Images optimized
[ ] Fonts optimized
[ ] Hero loads quickly
[ ] Scroll World deferred
[ ] Mobile fallback implemented
[ ] Reduced motion implemented
[ ] No obvious layout shifts
[ ] Scroll remains smooth
[ ] Third-party scripts minimized
[ ] Production build tested
[ ] Core Web Vitals measured
```

---

# 23. Definition of Done

Performance work is complete when:

* the production application renders quickly
* critical content does not depend on Scroll World
* client JavaScript is minimized
* assets are optimized
* mobile experience is lightweight
* reduced motion works
* Core Web Vitals meet project targets where reasonably measurable
* no major performance regression is introduced

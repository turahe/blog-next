# DESIGN.md — Personal Blog & Portfolio

## 1. Design Direction

### Design Concept

**Cinematic Engineering**

The visual language combines:

* Editorial typography
* Minimal interface
* Dark cinematic scenes
* Technical diagrams
* Code aesthetics
* Subtle motion
* Large whitespace

The website should feel like a combination of:

```text
Premium product website
        +
Engineering portfolio
        +
Technical publication
```

Avoid the appearance of a generic developer template.

---

# 2. Design Principles

## 2.1 Content First

Visual effects must never compete with content.

Priority:

```text
Content
  >
Navigation
  >
Interaction
  >
Animation
```

---

## 2.2 Cinematic but Minimal

Avoid:

* Excessive gradients
* Excessive glassmorphism
* Neon everywhere
* Excessive particles
* Constant animation
* Overloaded dashboards

Use visual effects intentionally.

---

## 2.3 Editorial Layout

Use strong typography and whitespace.

Example:

```text
                     BUILDING

              SOFTWARE SYSTEMS

              THAT MATTER.
```

Then supporting text:

```text
Software engineer focused on backend systems,
web applications, architecture, and developer tooling.
```

---

# 3. Visual Identity

## Color System

Recommended base:

```text
Background:
#0A0A0A

Primary Text:
#F5F5F5

Secondary Text:
#A1A1AA

Border:
#27272A

Surface:
#111111

Accent:
#FFFFFF
```

The accent color may later be replaced by a personal brand color.

Do not use many accent colors.

---

# 4. Typography

Recommended combination:

### Display

```text
Inter
Geist
Manrope
```

### Body

```text
Inter
Geist
```

### Code

```text
JetBrains Mono
IBM Plex Mono
```

Recommended hierarchy:

```text
H1
72–120px desktop

H2
48–72px

H3
28–40px

Body
18–20px

Small
14–16px
```

Mobile typography should scale down significantly.

---

# 5. Layout

Maximum content width:

```text
1200–1400px
```

Main content:

```text
padding-inline:
24px mobile
32px tablet
48px desktop
```

Large editorial sections may use wider layouts.

---

# 6. Homepage

## Section 01 — Scroll World Hero

Height:

```text
100svh
```

Desktop:

```text
┌──────────────────────────────────────────┐
│ NAV                                      │
│                                          │
│                                          │
│              BUILD                       │
│              SYSTEMS                     │
│                                          │
│              Software Engineer           │
│                                          │
│                         ↓ SCROLL         │
└──────────────────────────────────────────┘
```

Scroll World acts as the visual layer behind/around the content.

---

# 7. Scroll World Design

## Story

```text
SCENE 01
Workspace
    ↓
SCENE 02
Code
    ↓
SCENE 03
Architecture
    ↓
SCENE 04
Infrastructure
    ↓
SCENE 05
Product
    ↓
WEBSITE
```

---

## Scene Rules

Every scene should have:

```text
Visual
+
Narrative
+
Transition
```

Example:

```text
Scene:
Backend architecture

Visual:
API → Services → Database

Narrative:
"Designing systems beyond the interface."

Transition:
Camera moves through API gateway
into service layer.
```

---

# 8. Scroll Behavior

Scroll should control animation progress.

Conceptually:

```typescript
const progress = scrollY / scrollHeight

sceneTimeline.seek(progress)
```

The user should feel that:

```text
scrolling = moving the camera
```

not:

```text
scrolling = switching slides
```

---

# 9. Navigation

Desktop:

```text
┌───────────────────────────────────────────┐
│ Logo       About Projects Blog      Menu │
└───────────────────────────────────────────┘
```

Navigation should be minimal.

Recommended:

```text
Home
About
Projects
Blog
Resume
Contact
```

Sticky navigation may use a subtle background after scrolling.

---

# 10. Project Cards

Avoid standard SaaS cards.

Preferred:

```text
┌────────────────────────────────────────────┐
│                                            │
│ PROJECT IMAGE                              │
│                                            │
├────────────────────────────────────────────┤
│ Project Name                         2026  │
│                                            │
│ Short technical description               │
│                                            │
│ Go · PostgreSQL · Docker                   │
│                                      →     │
└────────────────────────────────────────────┘
```

Hover:

* Image movement
* Slight scale
* Arrow movement
* Border transition

Avoid excessive 3D effects.

---

# 11. Project Detail

Hero:

```text
PROJECT NAME

A scalable backend system for ...

Go · PostgreSQL · Redis · Docker
```

Then:

```text
Overview
```

followed by large visual.

Architecture section:

```text
                    API
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       Service A  Service B  Service C
          │          │          │
          └──────────┼──────────┘
                     ↓
                  Database
```

---

# 12. Blog Design

Blog should feel like a technical publication.

Listing:

```text
LATEST ARTICLES

2026-08-01

Designing Reliable Go Services
How to structure...

Go · Architecture

────────────────────────────

2026-07-25

Building AI Agents...
...
```

Avoid excessive card grids.

---

# 13. Article Design

Desktop:

```text
┌────────────────┬──────────────────────────┐
│                │                          │
│ Table of       │ Article                  │
│ Contents       │                          │
│                │                          │
│                │                          │
└────────────────┴──────────────────────────┘
```

Article width:

```text
680–760px
```

Code blocks may extend wider.

---

# 14. Code Block

Example:

```text
┌──────────────────────────────────────────────┐
│ go                                  COPY     │
├──────────────────────────────────────────────┤
│ package main                                 │
│                                              │
│ func main() {                                │
│     fmt.Println("Hello")                     │
│ }                                            │
└──────────────────────────────────────────────┘
```

Requirements:

* Language label
* Copy button
* Syntax highlighting
* Horizontal scrolling
* Line numbers optional

---

# 15. Motion System

Animation should have three levels.

## Level 1 — Micro

Examples:

* Button hover
* Arrow movement
* Opacity

Duration:

```text
150–250ms
```

## Level 2 — Section

Examples:

* Fade-in
* Image reveal
* Text reveal

Duration:

```text
400–800ms
```

## Level 3 — Scroll World

Long cinematic animation controlled by scroll.

This should be the only major motion system.

---

# 16. Reduced Motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

Then:

* Disable Scroll World
* Disable parallax
* Disable large transitions
* Show static hero image
* Keep content fully accessible

---

# 17. Responsive Strategy

## Desktop

Full Scroll World experience.

## Tablet

Simplified Scroll World.

## Mobile

Static or lightweight animated hero.

Do NOT ship desktop-sized video assets to mobile unnecessarily.

---

# 18. Image Strategy

Use:

* AVIF
* WebP
* Responsive images
* Lazy loading

Hero assets should be optimized aggressively.

Use poster images for videos.

---

# 19. Component Design

Use **shadcn/ui** (new-york style, neutral base) for shared interactive primitives.

```text
components/
├── layout/
│   ├── Header
│   ├── Footer
│   ├── Navigation
│   └── Container
│
├── ui/                  ← shadcn + project primitives
│   ├── button
│   ├── separator
│   ├── sheet
│   ├── Heading
│   └── Text
│
├── hero/
├── projects/
├── blog/
└── motion/
```

Prefer composing from `components/ui/*` over one-off styled controls.
Do not introduce a second competing component library.

---

# 20. Design Tokens

Centralize tokens in `app/globals.css`. Map DESIGN.md colors onto the
shadcn CSS variable contract (`--background`, `--foreground`, `--muted-foreground`,
`--primary`, `--border`, `--card` / surface, `--radius`, …).

```css
:root {
  --background: #fafafa;
  --foreground: #0a0a0a;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
  --card: #ffffff;
  --primary: #0a0a0a;
  --radius: 0.625rem;
}

html.dark {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
  --card: #111111;
  --primary: #ffffff;
}
```

Do not scatter arbitrary hex values throughout components.

---

# 21. Accessibility

Required:

* Semantic landmarks
* Keyboard support
* Focus indicators
* Accessible buttons
* Accessible navigation
* Proper heading structure
* Alt text
* Reduced motion
* Sufficient contrast

Animation must never be required to understand content.

---

# 22. Design Anti-Patterns

Do NOT use:

* Generic developer portfolio templates
* Excessive gradient text
* Huge animated cursors
* Infinite particles
* Excessive glassmorphism
* Every section animated
* Autoplay audio
* Full-screen video blocking content
* Text embedded only inside images/videos
* Animation that prevents normal scrolling

---

# 23. Design Quality Gate

Before accepting a page, verify:

### Visual

* Is hierarchy obvious?
* Is whitespace sufficient?
* Does it feel unique?
* Does animation have a purpose?

### UX

* Can the visitor find projects immediately?
* Can articles be read comfortably?
* Is navigation obvious?

### Accessibility

* Can it be navigated by keyboard?
* Does reduced motion work?
* Are headings semantic?

### Performance

* Is initial HTML rendered quickly?
* Are heavy assets deferred?
* Are images optimized?

### Mobile

* Is the page usable without Scroll World?
* Are touch targets sufficiently large?
* Is typography readable?

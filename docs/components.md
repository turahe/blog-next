# Components

## 1. Purpose

This document defines the component architecture for the blog and portfolio frontend.

Components should be:

* focused
* reusable
* accessible
* responsive
* easy to test
* compatible with Server Components where possible

---

# 2. Component Layers

```text
components/
│
├── layout/
├── ui/
├── blog/
├── projects/
├── profile/
└── scroll-world/
```

---

# 3. Layout Components

Recommended:

```text
layout/
├── Header.tsx
├── Navigation.tsx
├── Footer.tsx
├── Container.tsx
└── PageShell.tsx
```

Responsibilities:

* page structure
* navigation
* global layout
* responsive container

Layout components should not contain business logic.

---

# 4. UI Components

Recommended:

```text
ui/
├── Button.tsx
├── Link.tsx
├── Badge.tsx
├── Card.tsx
├── Heading.tsx
├── IconButton.tsx
└── Separator.tsx
```

These components should remain generic.

Do not put blog-specific behavior inside generic UI components.

---

# 5. Blog Components

Recommended:

```text
blog/
├── BlogCard.tsx
├── BlogList.tsx
├── ArticleHeader.tsx
├── ArticleContent.tsx
├── ArticleMeta.tsx
├── TableOfContents.tsx
├── RelatedPosts.tsx
└── BlogPagination.tsx
```

---

# 6. Project Components

Recommended:

```text
projects/
├── ProjectCard.tsx
├── ProjectGrid.tsx
├── ProjectHeader.tsx
├── ProjectContent.tsx
├── ProjectMeta.tsx
├── TechnologyList.tsx
└── RelatedProjects.tsx
```

---

# 7. Scroll World Components

Recommended:

```text
scroll-world/
├── ScrollWorld.tsx
├── ScrollWorldScene.tsx
├── ScrollWorldFallback.tsx
├── ScrollWorldMobile.tsx
└── scene-config.ts
```

Responsibilities must remain separated.

---

# 8. Server/Client Rules

Default:

```text
Server Component
```

Use Client Components for:

* animation
* browser APIs
* interaction
* local state

Example:

```text
Hero
├── Server
│
└── ScrollWorld
    └── Client
```

---

# 9. Props

Props should be explicit and typed.

Avoid:

```typescript
props: any
```

Prefer:

```typescript
interface ProjectCardProps {
  title: string
  description: string
  slug: string
}
```

---

# 10. API Independence

Components should not directly depend on REST endpoints.

Bad:

```text
ProjectCard
   ↓
fetch API
```

Preferred:

```text
API
 ↓
Page
 ↓
ProjectCard
```

---

# 11. Component Responsibilities

A component should have one primary responsibility.

Bad:

```text
HomePage
├── API fetching
├── SEO
├── navigation
├── animation
├── project rendering
└── blog rendering
```

Preferred:

```text
Page
├── data fetching
├── metadata
├── Hero
├── Projects
├── Articles
└── Footer
```

---

# 12. Accessibility

Interactive components must support:

* keyboard
* focus
* screen readers
* reduced motion
* touch

Icon-only controls require accessible labels.

---

# 13. Responsive Components

Components must work across:

```text
320px
375px
768px
1024px
1280px+
```

Do not assume desktop dimensions.

---

# 14. Styling

Use Tailwind CSS.

Do not create unnecessary CSS files.

Use shared design tokens defined by `DESIGN.md`.

---

# 15. Animation

Animation must be optional.

Every animated component must have a usable non-animated state.

This is especially important for Scroll World.

---

# 16. Component Naming

Use PascalCase:

```text
BlogCard.tsx
ProjectCard.tsx
ScrollWorld.tsx
```

Avoid ambiguous names:

```text
Thing.tsx
Box.tsx
Section2.tsx
```

---

# 17. Composition

Prefer composition over deeply nested conditional components.

Example:

```tsx
<Card>
  <CardHeader />
  <CardContent />
  <CardFooter />
</Card>
```

when it improves reuse.

---

# 18. Avoid Premature Abstraction

Do not create a generic component merely because two components look similar.

First determine whether the behavior and semantics are actually shared.

---

# 19. Definition of Done

A component is complete when:

* responsibility is clear
* props are typed
* responsive behavior works
* accessibility is handled
* Server/Client boundary is appropriate
* styling follows DESIGN.md
* no unnecessary API dependency exists
* no unnecessary abstraction exists

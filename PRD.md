# PRD — Personal Blog & Portfolio with Scroll World

## 1. Product Overview

### Product Name

Personal Blog & Portfolio

### Product Type

Personal developer portfolio, technical blog, project showcase, and professional profile.

### Primary Goal

Build a high-quality personal website that combines:

* Personal portfolio
* Technical blog
* Project showcase
* Case studies
* Developer profile
* Technical expertise
* Contact and social links

The website should provide a premium visual experience using a **scroll-driven cinematic "Scroll World" experience**, while keeping the actual content semantic, accessible, SEO-friendly, and performant.

---

# 2. Product Vision

The website should communicate:

> "This is not just a developer portfolio. This is a representation of how I build software."

The visitor should be able to understand within a few seconds:

1. Who the developer is
2. What technologies they work with
3. What they have built
4. How they approach engineering
5. What they write about
6. How to contact them

The visual experience should be memorable without sacrificing usability.

---

# 3. Target Users

## 3.1 Recruiters

Recruiters should be able to quickly find:

* Developer profile
* Experience
* Skills
* Projects
* Resume
* Contact information

## 3.2 Engineering Managers

Engineering managers should be able to evaluate:

* Engineering experience
* Architecture knowledge
* Backend/frontend skills
* System design
* Project complexity
* Technical decision making

## 3.3 Developers

Developers should be able to:

* Read technical articles
* Explore source code
* Understand architecture decisions
* Learn from project case studies

## 3.4 Potential Clients

Clients should be able to understand:

* Services
* Previous projects
* Technical capabilities
* Development approach
* Contact information

---

# 4. Core Pages

## 4.1 Home

The homepage is the primary storytelling experience.

Sections:

1. Hero
2. Introduction
3. Engineering philosophy
4. Selected projects
5. Technical expertise
6. Latest articles
7. Experience
8. Contact CTA
9. Footer

The hero may use Scroll World.

---

## 4.2 About

Content:

* Profile
* Professional summary
* Engineering philosophy
* Career timeline
* Technical interests
* Personal working principles

---

## 4.3 Projects

Project listing with:

* Project title
* Description
* Role
* Technologies
* Year
* Category
* Project status
* Repository
* Live demo

Filters:

* Backend
* Frontend
* Fullstack
* AI
* DevOps
* Architecture
* Open Source

---

## 4.4 Project Detail / Case Study

Each important project can have a case study.

Structure:

```text
Project Overview
       ↓
Problem
       ↓
Requirements
       ↓
Architecture
       ↓
Technical Decisions
       ↓
Implementation
       ↓
Challenges
       ↓
Performance
       ↓
Results
       ↓
Lessons Learned
```

---

## 4.5 Blog

Features:

* Article listing
* Categories
* Tags
* Search
* Pagination or infinite loading
* Reading time
* Publication date
* Author
* Featured article

---

## 4.6 Blog Article

Article features:

* SEO metadata
* Table of contents
* Code highlighting
* Copy code button
* Images
* Diagrams
* Related articles
* Previous/next article
* Reading progress
* Share links

Technical articles should support:

* TypeScript
* JavaScript
* Go
* SQL
* Docker
* Kubernetes
* Architecture
* AI
* DevOps

---

## 4.7 Resume

Provide:

* Professional summary
* Experience
* Skills
* Education
* Certifications if applicable
* Downloadable PDF

---

## 4.8 Contact

Provide:

* Email
* GitHub
* LinkedIn
* Other professional links
* Optional contact form

---

# 5. Scroll World Experience

## 5.1 Purpose

Scroll World is used to create a cinematic introduction to the developer.

It should communicate the transition:

```text
Idea
  ↓
Code
  ↓
System
  ↓
Product
```

---

## 5.2 Hero Story

Recommended scenes:

### Scene 1 — The Beginning

Visual:

```text
Dark environment
Developer workspace
Code fragments
Terminal
```

Message:

> Build with intent.

### Scene 2 — The Code

Camera moves through:

```text
Code
API
Database
Services
```

Message:

> From code to systems.

### Scene 3 — The System

Visual representation of:

```text
Frontend
    ↓
API
    ↓
Services
    ↓
Database
    ↓
Infrastructure
```

Message:

> Engineering beyond the interface.

### Scene 4 — The Product

The system transforms into a finished product.

Message:

> Software that solves real problems.

### Scene 5 — Portfolio

Transition into normal website content.

CTA:

* Explore Projects
* Read Blog

---

# 6. Functional Requirements

## FR-001 — Navigation

The website MUST provide:

* Home
* About
* Projects
* Blog
* Resume
* Contact

Navigation MUST work without JavaScript where reasonably possible.

---

## FR-002 — Responsive Design

Support:

* Desktop
* Laptop
* Tablet
* Mobile

The Scroll World experience MUST have a simplified mobile implementation.

Mobile should not require heavy video assets.

---

## FR-003 — Accessibility

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible contrast
* Reduced motion support
* Proper heading hierarchy
* Alt text
* Screen-reader compatible navigation

If:

```css
prefers-reduced-motion: reduce
```

is enabled, Scroll World animations MUST be disabled or significantly simplified.

---

## FR-004 — Blog

The system MUST support:

* Markdown/MDX content
* Frontmatter
* Tags
* Categories
* Draft status
* Publication date
* Updated date
* Reading time
* Cover image
* Author information

---

## FR-005 — Code Blocks

Blog articles MUST support:

* Syntax highlighting
* Copy button
* Language label
* Line highlighting where applicable

---

## FR-006 — Search

Blog search should support:

* Title
* Description
* Tags
* Categories
* Content

Search should preferably be client-side or statically generated for the initial version.

---

## FR-007 — SEO

Every public page MUST support:

* Title
* Description
* Canonical URL
* Open Graph
* Twitter/X metadata
* Structured data where appropriate
* Sitemap
* Robots.txt

Articles should use `Article` structured data.

---

## FR-008 — Performance

Target:

* Lighthouse Performance >= 90
* Lighthouse Accessibility >= 95
* Lighthouse SEO >= 95

Scroll World MUST NOT block initial content rendering.

---

# 7. Non-Functional Requirements

## Performance

Critical content must render before heavy visual assets.

Preferred loading strategy:

```text
HTML
 ↓
Critical CSS
 ↓
Main content
 ↓
Images
 ↓
Scroll World assets
```

Never:

```text
Scroll World video
 ↓
wait
 ↓
render website
```

---

## SEO

Blog content MUST be server-rendered or statically generated.

The cinematic layer must not contain the only copy of important information.

For example:

Bad:

```text
Video contains:
"I'm a backend engineer..."
```

Good:

```html
<h1>Backend Engineer & Software Developer</h1>
<p>
I build scalable web applications and backend systems.
</p>
```

The animation enhances the content.

---

# 8. Content Model

## Project

```typescript
interface Project {
  slug: string
  title: string
  description: string
  category: string[]
  technologies: string[]
  year: number
  role: string
  featured: boolean
  image?: string
  repository?: string
  demo?: string
}
```

## Blog Post

```typescript
interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  category: string
  author: string
  cover?: string
  draft: boolean
}
```

---

# 9. Content Strategy

Primary content categories:

* Software Engineering
* Golang
* Vue.js
* Next.js
* TypeScript
* Database
* System Architecture
* Docker
* Kubernetes
* AI
* Developer Tools

Project content should prioritize **case studies over simple screenshots**.

---

# 10. Analytics

Optional analytics:

* Page views
* Article views
* Project clicks
* Resume downloads
* External link clicks

Analytics MUST respect privacy requirements.

---

# 11. Security

The website should minimize attack surface.

Requirements:

* No secrets in frontend
* CSP where practical
* Secure headers
* Input validation for contact form
* Rate limiting for contact endpoint
* Spam protection

---

# 12. Recommended Architecture

Preferred architecture:

```text
Next.js
├── Static / SSR Pages
├── Blog
├── Projects
├── MDX
├── SEO
└── Scroll World Client Layer
```

The Scroll World engine should be isolated from normal application components.

Example:

```text
components/
├── scroll-world/
│   ├── ScrollWorld.tsx
│   ├── Scene.tsx
│   ├── CameraTimeline.tsx
│   ├── VideoScene.tsx
│   └── MobileFallback.tsx
│
├── blog/
├── projects/
├── navigation/
└── ui/
```

---

# 13. MVP

MVP MUST include:

* Home
* About
* Projects
* Blog
* Project detail
* Blog detail
* Contact
* Responsive design
* SEO
* Dark/light theme
* Basic Scroll World hero
* Reduced motion support
* Analytics

---

# 14. Future Features

Potential future features:

* Interactive architecture diagrams
* AI-powered article search
* RSS
* Newsletter
* Guestbook
* Comments
* Project timeline
* Interactive GitHub statistics
* 3D WebGL experience
* AI chatbot for portfolio

These should NOT be implemented in MVP.

---

# 15. Acceptance Criteria

The project is considered complete when:

* All primary pages are accessible
* Blog articles are indexable
* Projects have dedicated pages
* Responsive layout works
* Scroll World works on desktop
* Mobile fallback works
* Reduced motion works
* SEO metadata is correct
* No critical accessibility violations exist
* Heavy assets do not block initial render
* Lighthouse targets are approximately achieved
* Production build succeeds
* No console errors exist

# Portfolio Site Design Spec

**Date**: 2026-05-20
**Status**: Approved

---

## 1. Overview

Personal portfolio site deployed on GitHub Pages. Showcases projects with name, tech stack, description, and images. Designed for easy extensibility — adding a new project means appending one entry to a JSON file.

## 2. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Vue 3 (Composition API) | Component model, ecosystem |
| Build | Vite | Fast dev server, optimized builds |
| Router | vue-router (hash mode) | Required for GitHub Pages SPA routing |
| Styling | Plain CSS (scoped) | No extra dependency needed for this scale |
| Testing | Vitest + @vue/test-utils | Vite-native, fast |
| CI/CD | GitHub Actions → gh-pages | Auto deploy on push to main |

## 3. Visual Design

- **Theme**: Dark tech-blue. Background `#0d1117`, accent `#58a6ff`, text `#c9d1d9`.
- **Homepage Layout**: Top navbar → large centered Hero (avatar, name, tagline, social links) → Project grid (2-column on desktop, 1-column on mobile).
- **Project Detail Layout**: Back link → left-right split. Left: large image + thumbnail strip. Right: title, tech tags, full description (Markdown rendered), external links.
- **Typography**: System font stack. Clean hierarchy via size and weight (no decorative fonts).

## 4. Project Structure (SDD + TDD)

```
project-root/
├── AGENTS.md
├── README.md
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
│
├── docs/
│   ├── index.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── component-tree.md
│   │   └── adr/
│   │       ├── 0001-use-vue-vite.md
│   │       └── 0002-github-pages-deploy.md
│   ├── specs/
│   │   ├── homepage/
│   │   │   ├── spec.md
│   │   │   ├── plan.md
│   │   │   └── tasks.md
│   │   ├── project-detail/
│   │   │   ├── spec.md
│   │   │   ├── plan.md
│   │   │   └── tasks.md
│   │   └── project-data/
│   │       ├── spec.md
│   │       ├── plan.md
│   │       └── tasks.md
│   ├── testing/
│   │   ├── testing-strategy.md
│   │   ├── tdd-guide.md
│   │   └── test-data.md
│   └── ai/
│       ├── coding-rules.md
│       ├── context-map.md
│       └── review-checklist.md
│
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── HomePage.vue
│   │   └── ProjectDetail.vue
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── ProjectCard.vue
│   │   ├── ProjectGrid.vue
│   │   ├── TechTag.vue
│   │   └── ImageGallery.vue
│   ├── data/
│   │   └── projects.json
│   ├── composables/
│   │   └── useProjects.js
│   └── assets/
│       ├── images/
│       └── styles/
│           └── main.css
│
├── tests/
│   ├── unit/
│   │   ├── ProjectCard.spec.js
│   │   ├── ProjectGrid.spec.js
│   │   ├── NavBar.spec.js
│   │   └── useProjects.spec.js
│   ├── integration/
│   │   ├── router.spec.js
│   │   └── project-flow.spec.js
│   ├── fixtures/
│   │   └── sample-projects.js
│   └── setup.js
│
├── scripts/
│   ├── deploy.sh
│   └── lint.sh
│
└── .github/
    └── workflows/
        └── deploy.yml
```

## 5. Data Model

`src/data/projects.json` — single source of truth for all project content:

```json
{
  "projects": [
    {
      "id": "agent-runtime",
      "name": "Agent Runtime",
      "summary": "LLM Agent runtime framework with tool calling, checkpoint, risk control",
      "description": "Full description... (Markdown supported)",
      "techStack": ["Python", "FastAPI", "Redis", "MCP"],
      "images": [
        { "src": "screenshot1.png", "alt": "Architecture diagram" },
        { "src": "screenshot2.png", "alt": "Runtime screenshot" }
      ],
      "links": {
        "github": "https://github.com/...",
        "demo": "https://..."
      },
      "featured": true
    }
  ]
}
```

**Fields**:
- `id` — URL slug (`/#/project/agent-runtime`), must be unique
- `summary` — Short description shown on ProjectCard (1-2 sentences)
- `description` — Full Markdown content for detail page
- `techStack` — Array of strings rendered as TechTag components
- `images` — Array of `{src, alt}` objects. First image is the card cover; all shown in ImageGallery on detail page
- `links.github` / `links.demo` — Optional external URLs
- `featured` — `true` projects appear in a highlighted row above the main grid

## 6. Component Architecture & Data Flow

**Component Tree**:
```
App.vue
├── NavBar.vue          (fixed top: logo + nav links)
└── <router-view>
    ├── HomePage.vue
    │   ├── HeroSection.vue    (avatar, name, bio, social links)
    │   └── ProjectGrid.vue    (responsive grid of cards)
    │       └── ProjectCard.vue × N
    └── ProjectDetail.vue
        ├── ImageGallery.vue   (left: large image + thumbnails)
        └── (right: title, tags, description, links)
```

**Data Flow**:
```
projects.json → useProjects.js (composable) → components
                    ├── getAllProjects()
                    ├── getFeaturedProjects()
                    └── getProjectById(id)
```

**Routes**:
| Path | View | Description |
|------|------|-------------|
| `/#/` | HomePage | Hero + project grid |
| `/#/project/:id` | ProjectDetail | Left-right split detail |
| `/#/*` | Redirect → `/#/` | Catch-all |

## 7. Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest + vue-test-utils | Each component renders correctly with mock props; composable returns correct data |
| Integration | Vitest + vue-router | Route resolution, navigation flow, 404 redirect |
| E2E | Not in v1 | Would use Playwright if needed later |

**Key test cases**:
- `ProjectCard` — renders name, summary, tech tags, cover image from prop
- `ProjectGrid` — renders correct number of cards from data; featured section shows when present
- `NavBar` — all nav links present
- `useProjects` — `getAllProjects`, `getProjectById(null)`, `getFeaturedProjects` with fixture data
- `router` — `/` resolves to HomePage, `/project/:id` resolves to ProjectDetail, unknown routes redirect

## 8. Deployment

GitHub Actions workflow triggered on push to `main`:
1. Checkout → Setup Node → `npm ci` → `npm run build` → Deploy to `gh-pages` branch
2. GitHub Pages configured to serve from `gh-pages` branch root

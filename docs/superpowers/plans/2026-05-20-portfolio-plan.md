# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vue 3 + Vite personal portfolio SPA with project showcase, deployable to GitHub Pages via GitHub Actions.

**Architecture:** Hash-mode SPA with two views (HomePage + ProjectDetail). Project data lives in a JSON file consumed by a `useProjects` composable. Components follow a strict hierarchy: App → NavBar + router-view → views → child components. TDD throughout with Vitest.

**Tech Stack:** Vue 3 (Composition API), Vite, vue-router (hash mode), Vitest + @vue/test-utils, marked (Markdown rendering), GitHub Actions for CI/CD.

---

### Task 1: Scaffold Vite + Vue 3 Project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint . --ext .vue,.js"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "marked": "^12.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.4.0",
    "vitest": "^1.6.0",
    "@vue/test-utils": "^2.4.0",
    "jsdom": "^24.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js']
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#58a6ff"/>
  <text x="16" y="22" text-anchor="middle" fill="#0d1117" font-size="18" font-family="monospace" font-weight="bold">P</text>
</svg>
```

- [ ] **Step 5: Create .gitignore**

```
node_modules/
dist/
.env
.env.local
*.log
```

- [ ] **Step 6: Install dependencies**

```bash
cd c:/07-personal/Portfolio && npm install
```

Expected: `npm install` completes without errors.

- [ ] **Step 7: Create tests/setup.js**

```js
import { config } from '@vue/test-utils'

config.global.stubs = {
  'router-link': {
    props: ['to'],
    template: '<a :href="to"><slot /></a>'
  },
  'router-view': {
    template: '<div><slot /></div>'
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add package.json vite.config.js index.html favicon.svg .gitignore tests/setup.js
git commit -m "feat: scaffold Vite + Vue 3 project"
```

---

### Task 2: Create Directory Structure

**Files:**
- Create: all empty directories and placeholder files

- [ ] **Step 1: Create all directories**

```bash
cd c:/07-personal/Portfolio
mkdir -p src/router src/views src/components src/data src/composables src/assets/images src/assets/styles
mkdir -p tests/unit tests/integration tests/fixtures
mkdir -p docs/architecture/adr docs/specs/homepage docs/specs/project-detail docs/specs/project-data docs/testing docs/ai
mkdir -p scripts .github/workflows
```

- [ ] **Step 2: Create .env.example**

```
VITE_SITE_TITLE=My Portfolio
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourusername
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: create project directory structure"
```

---

### Task 3: Create Test Fixtures

**Files:**
- Create: `tests/fixtures/sample-projects.js`

- [ ] **Step 1: Write sample-projects.js**

```js
export const sampleProjects = [
  {
    id: 'agent-runtime',
    name: 'Agent Runtime',
    summary: 'LLM Agent runtime with tool calling, checkpoint, and risk control',
    description: '## Overview\n\nA complete **LLM Agent runtime** framework.\n\n### Features\n- Tool calling via MCP protocol\n- Session checkpoint/restore\n- Risk classification and approval flow',
    techStack: ['Python', 'FastAPI', 'Redis', 'MCP'],
    images: [
      { src: '/images/agent-arch.png', alt: 'Architecture diagram' },
      { src: '/images/agent-runtime.png', alt: 'Runtime screenshot' }
    ],
    links: { github: 'https://github.com/example/agent-runtime', demo: null },
    featured: true
  },
  {
    id: 'microservice-platform',
    name: 'Microservice Platform',
    summary: 'Spring Cloud microservice platform with service discovery and distributed tracing',
    description: '## Overview\n\nProduction-grade microservice platform built on Spring Cloud.',
    techStack: ['Java', 'Spring Cloud', 'Docker', 'Kubernetes'],
    images: [
      { src: '/images/ms-arch.png', alt: 'Service architecture' }
    ],
    links: { github: 'https://github.com/example/ms-platform', demo: null },
    featured: true
  },
  {
    id: 'knowledge-base',
    name: 'AI Knowledge Base',
    summary: 'Personal knowledge base system using RAG and LLM-based content processing',
    description: '## Overview\n\nAn AI-powered knowledge management system.',
    techStack: ['Python', 'LangChain', 'ChromaDB', 'FastAPI'],
    images: [
      { src: '/images/kb-demo.png', alt: 'Knowledge base demo' }
    ],
    links: { github: 'https://github.com/example/knowledge-base', demo: 'https://kb-demo.example.com' },
    featured: false
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    summary: 'High-performance API gateway with rate limiting, auth, and routing',
    description: '## Overview\n\nCustom API gateway handling 10k+ requests/second with dynamic routing.',
    techStack: ['Go', 'Redis', 'gRPC', 'Docker'],
    images: [],
    links: { github: 'https://github.com/example/api-gateway', demo: null },
    featured: false
  }
]

export const sampleProject = sampleProjects[0]
```

- [ ] **Step 2: Commit**

```bash
git add tests/fixtures/sample-projects.js
git commit -m "test: add sample project fixtures"
```

---

### Task 4: Create useProjects Composable (TDD)

**Files:**
- Create: `src/composables/useProjects.js`
- Modify: `vite.config.js` (add test config for JSON imports)
- Create: `src/data/projects.json`
- Create: `tests/unit/useProjects.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/useProjects.spec.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProjects } from '@/composables/useProjects.js'
import { sampleProjects } from '../fixtures/sample-projects.js'

vi.mock('@/data/projects.json', () => ({
  default: { projects: [] }
}))

describe('useProjects', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('getAllProjects returns all projects', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: sampleProjects }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getAllProjects } = useProjects()
    const result = getAllProjects()
    expect(result).toHaveLength(4)
    expect(result[0].id).toBe('agent-runtime')
  })

  it('getFeaturedProjects returns only featured projects', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: sampleProjects }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getFeaturedProjects } = useProjects()
    const result = getFeaturedProjects()
    expect(result).toHaveLength(2)
    expect(result.every(p => p.featured)).toBe(true)
  })

  it('getProjectById returns correct project', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: sampleProjects }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getProjectById } = useProjects()
    const result = getProjectById('microservice-platform')
    expect(result.name).toBe('Microservice Platform')
  })

  it('getProjectById returns undefined for unknown id', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: sampleProjects }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getProjectById } = useProjects()
    const result = getProjectById('nonexistent')
    expect(result).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/useProjects.spec.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create projects.json**

```json
{
  "projects": []
}
```

- [ ] **Step 4: Write minimal useProjects.js**

```js
import projectsData from '@/data/projects.json'

export function useProjects() {
  const projects = projectsData.projects

  function getAllProjects() {
    return projects
  }

  function getFeaturedProjects() {
    return projects.filter(p => p.featured)
  }

  function getProjectById(id) {
    return projects.find(p => p.id === id)
  }

  return { getAllProjects, getFeaturedProjects, getProjectById }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/unit/useProjects.spec.js
```

Expected: PASS — 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/composables/useProjects.js src/data/projects.json tests/unit/useProjects.spec.js
git commit -m "feat: add useProjects composable with TDD"
```

---

### Task 5: Set Up Router (TDD)

**Files:**
- Create: `src/router/index.js`
- Create: `tests/integration/router.spec.js`
- Create: `src/views/HomePage.vue` (minimal stub)
- Create: `src/views/ProjectDetail.vue` (minimal stub)

- [ ] **Step 1: Write the failing router test**

```js
// tests/integration/router.spec.js
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = { template: '<div>Home</div>' }
const ProjectDetail = { template: '<div>Detail</div>' }

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/project/:id', name: 'project-detail', component: ProjectDetail },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

describe('router', () => {
  it('resolves / to HomePage', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('resolves /project/:id to ProjectDetail', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/project/agent-runtime')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('project-detail')
    expect(router.currentRoute.value.params.id).toBe('agent-runtime')
  })

  it('redirects unknown routes to /', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/nonexistent')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/integration/router.spec.js
```

Expected: FAIL — routes not yet wired to real views.

- [ ] **Step 3: Create stub views and router**

```vue
<!-- src/views/HomePage.vue -->
<template>
  <div>HomePage placeholder</div>
</template>
```

```vue
<!-- src/views/ProjectDetail.vue -->
<template>
  <div>ProjectDetail placeholder</div>
</template>
```

```js
// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/project/:id', name: 'project-detail', component: ProjectDetail },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/integration/router.spec.js
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/router/index.js src/views/HomePage.vue src/views/ProjectDetail.vue tests/integration/router.spec.js
git commit -m "feat: add router with hash mode and catch-all redirect"
```

---

### Task 6: Create TechTag Component (TDD)

**Files:**
- Create: `src/components/TechTag.vue`
- Create: `tests/unit/TechTag.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/TechTag.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechTag from '@/components/TechTag.vue'

describe('TechTag', () => {
  it('renders the text prop', () => {
    const wrapper = mount(TechTag, { props: { text: 'Vue.js' } })
    expect(wrapper.text()).toBe('Vue.js')
    expect(wrapper.classes()).toContain('tech-tag')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/TechTag.spec.js
```

Expected: FAIL — component not found.

- [ ] **Step 3: Write minimal TechTag.vue**

```vue
<template>
  <span class="tech-tag">{{ text }}</span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true }
})
</script>

<style scoped>
.tech-tag {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.75rem;
  color: #58a6ff;
  background: rgba(31, 111, 235, 0.15);
  border-radius: 9999px;
  white-space: nowrap;
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/TechTag.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/TechTag.vue tests/unit/TechTag.spec.js
git commit -m "feat: add TechTag component"
```

---

### Task 7: Create NavBar Component (TDD)

**Files:**
- Create: `src/components/NavBar.vue`
- Create: `tests/unit/NavBar.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/NavBar.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar', () => {
  it('renders site title', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.text()).toContain('Portfolio')
  })

  it('renders nav links', () => {
    const wrapper = mount(NavBar)
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/NavBar.spec.js
```

Expected: FAIL.

- [ ] **Step 3: Write NavBar.vue**

```vue
<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand">Portfolio</router-link>
    <div class="navbar-links">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener">GitHub</a>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: rgba(13, 17, 23, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #21262d;
}

.navbar-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: #c9d1d9;
  text-decoration: none;
}

.navbar-links a {
  color: #8b949e;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s;
}

.navbar-links a:hover {
  color: #58a6ff;
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/NavBar.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.vue tests/unit/NavBar.spec.js
git commit -m "feat: add NavBar component"
```

---

### Task 8: Create HeroSection Component (TDD)

**Files:**
- Create: `src/components/HeroSection.vue`
- Create: `tests/unit/HeroSection.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/HeroSection.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'

describe('HeroSection', () => {
  it('renders name and tagline', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Your Name')
    expect(wrapper.text()).toContain('Developer')
  })

  it('renders social links', () => {
    const wrapper = mount(HeroSection)
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/HeroSection.spec.js
```

Expected: FAIL.

- [ ] **Step 3: Write HeroSection.vue**

```vue
<template>
  <section class="hero">
    <div class="hero-avatar"></div>
    <h1 class="hero-name">Your Name</h1>
    <p class="hero-tagline">Java Developer & AI Engineer</p>
    <div class="hero-links">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="hero-link">GitHub</a>
      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" class="hero-link">LinkedIn</a>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 24px 48px;
}

.hero-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #21262d;
  margin: 0 auto 20px;
}

.hero-name {
  font-size: 2rem;
  font-weight: 700;
  color: #c9d1d9;
  margin: 0 0 8px;
}

.hero-tagline {
  font-size: 1.05rem;
  color: #8b949e;
  margin: 0 0 24px;
}

.hero-links {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.hero-link {
  display: inline-block;
  padding: 8px 20px;
  font-size: 0.9rem;
  color: #c9d1d9;
  background: #21262d;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid #30363d;
  transition: border-color 0.15s, color 0.15s;
}

.hero-link:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/HeroSection.spec.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.vue tests/unit/HeroSection.spec.js
git commit -m "feat: add HeroSection component"
```

---

### Task 9: Create ProjectCard Component (TDD)

**Files:**
- Create: `src/components/ProjectCard.vue`
- Create: `tests/unit/ProjectCard.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/ProjectCard.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import { sampleProject } from '../fixtures/sample-projects.js'

describe('ProjectCard', () => {
  it('renders project name and summary', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    expect(wrapper.text()).toContain('Agent Runtime')
    expect(wrapper.text()).toContain('LLM Agent runtime')
  })

  it('renders tech tags', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    const tags = wrapper.findAll('.tech-tag')
    expect(tags).toHaveLength(4)
  })

  it('links to project detail page', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toContain('/project/agent-runtime')
  })

  it('shows featured badge when featured is true', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    expect(wrapper.find('.featured-badge').exists()).toBe(true)
  })

  it('does not show featured badge when featured is false', () => {
    const notFeatured = { ...sampleProject, featured: false }
    const wrapper = mount(ProjectCard, {
      props: { project: notFeatured }
    })
    expect(wrapper.find('.featured-badge').exists()).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/ProjectCard.spec.js
```

Expected: FAIL.

- [ ] **Step 3: Write ProjectCard.vue**

```vue
<template>
  <router-link :to="`/project/${project.id}`" class="card">
    <div class="card-image">
      <img
        v-if="project.images && project.images.length > 0"
        :src="project.images[0].src"
        :alt="project.images[0].alt"
      />
      <div v-else class="card-image-placeholder"></div>
      <span v-if="project.featured" class="featured-badge">Featured</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ project.name }}</h3>
      <p class="card-summary">{{ project.summary }}</p>
      <div class="card-tags">
        <TechTag
          v-for="tech in project.techStack"
          :key="tech"
          :text="tech"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import TechTag from './TechTag.vue'

defineProps({
  project: { type: Object, required: true }
})
</script>

<style scoped>
.card {
  display: block;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: #30363d;
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: #0d1117;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #161b22 0%, #1a2332 100%);
}

.featured-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #0d1117;
  background: #58a6ff;
  border-radius: 9999px;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #c9d1d9;
  margin: 0 0 6px;
}

.card-summary {
  font-size: 0.85rem;
  color: #8b949e;
  margin: 0 0 12px;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/ProjectCard.spec.js
```

Expected: PASS — 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.vue tests/unit/ProjectCard.spec.js
git commit -m "feat: add ProjectCard component"
```

---

### Task 10: Create ProjectGrid Component (TDD)

**Files:**
- Create: `src/components/ProjectGrid.vue`
- Create: `tests/unit/ProjectGrid.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/ProjectGrid.spec.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectGrid from '@/components/ProjectGrid.vue'
import { sampleProjects } from '../fixtures/sample-projects.js'

vi.mock('@/composables/useProjects.js', () => ({
  useProjects: () => ({
    getAllProjects: () => sampleProjects,
    getFeaturedProjects: () => sampleProjects.filter(p => p.featured)
  })
}))

describe('ProjectGrid', () => {
  it('renders all projects', () => {
    const wrapper = mount(ProjectGrid)
    const cards = wrapper.findAll('.card')
    expect(cards).toHaveLength(4)
  })

  it('renders featured section label', () => {
    const wrapper = mount(ProjectGrid)
    expect(wrapper.text()).toContain('Featured')
  })

  it('renders all projects section label', () => {
    const wrapper = mount(ProjectGrid)
    expect(wrapper.text()).toContain('All Projects')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/ProjectGrid.spec.js
```

Expected: FAIL.

- [ ] **Step 3: Write ProjectGrid.vue**

```vue
<template>
  <section class="projects">
    <div v-if="featuredProjects.length > 0" class="section">
      <h2 class="section-title">Featured</h2>
      <div class="grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
    <div class="section">
      <h2 class="section-title">All Projects</h2>
      <div class="grid">
        <ProjectCard
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProjects } from '@/composables/useProjects.js'
import ProjectCard from './ProjectCard.vue'

const { getAllProjects, getFeaturedProjects } = useProjects()
const allProjects = getAllProjects()
const featuredProjects = getFeaturedProjects()
</script>

<style scoped>
.projects {
  padding: 0 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #c9d1d9;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #21262d;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/ProjectGrid.spec.js
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectGrid.vue tests/unit/ProjectGrid.spec.js
git commit -m "feat: add ProjectGrid component"
```

---

### Task 11: Wire Up HomePage

**Files:**
- Modify: `src/views/HomePage.vue`
- Create: `tests/integration/project-flow.spec.js`

- [ ] **Step 1: Write the integration test**

```js
// tests/integration/project-flow.spec.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  createRouter: () => ({}),
  createWebHashHistory: () => ({}),
  useRoute: () => ({})
}))

vi.mock('@/composables/useProjects.js', () => ({
  useProjects: () => ({
    getAllProjects: () => ([
      {
        id: 'test-project',
        name: 'Test Project',
        summary: 'A test',
        description: '# Test',
        techStack: ['Vue'],
        images: [],
        links: { github: null, demo: null },
        featured: false
      }
    ]),
    getFeaturedProjects: () => ([])
  })
}))

import HomePage from '@/views/HomePage.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

describe('project-flow', () => {
  it('HomePage renders HeroSection and ProjectGrid', () => {
    const wrapper = mount(HomePage, {
      global: { stubs: { HeroSection: true, ProjectGrid: true } }
    })
    expect(wrapper.findComponent({ name: 'HeroSection' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ProjectGrid' }).exists()).toBe(true)
  })

  it('ProjectDetail renders with project data', () => {
    const wrapper = mount(ProjectDetail, {
      global: {
        stubs: { ImageGallery: true }
      },
      mocks: {
        $route: { params: { id: 'test-project' } }
      }
    })
    expect(wrapper.text()).toContain('Test Project')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/integration/project-flow.spec.js
```

Expected: FAIL — HomePage still has placeholder content.

- [ ] **Step 3: Update HomePage.vue**

```vue
<template>
  <div class="home-page">
    <HeroSection />
    <ProjectGrid />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
</script>
```

- [ ] **Step 4: First add real projects to projects.json, then update ProjectDetail.vue**

```json
{
  "projects": [
    {
      "id": "agent-runtime",
      "name": "Agent Runtime",
      "summary": "LLM Agent runtime with tool calling, checkpoint, and risk control",
      "description": "## Overview\n\nA complete **LLM Agent runtime** framework.\n\n### Features\n- Tool calling via MCP protocol\n- Session checkpoint/restore\n- Risk classification and approval flow",
      "techStack": ["Python", "FastAPI", "Redis", "MCP"],
      "images": [],
      "links": { "github": "https://github.com/example/agent-runtime", "demo": null },
      "featured": true
    },
    {
      "id": "microservice-platform",
      "name": "Microservice Platform",
      "summary": "Spring Cloud microservice platform with service discovery and distributed tracing",
      "description": "## Overview\n\nProduction-grade microservice platform built on Spring Cloud.",
      "techStack": ["Java", "Spring Cloud", "Docker", "Kubernetes"],
      "images": [],
      "links": { "github": "https://github.com/example/ms-platform", "demo": null },
      "featured": true
    },
    {
      "id": "knowledge-base",
      "name": "AI Knowledge Base",
      "summary": "Personal knowledge base system using RAG and LLM-based content processing",
      "description": "## Overview\n\nAn AI-powered knowledge management system.",
      "techStack": ["Python", "LangChain", "ChromaDB", "FastAPI"],
      "images": [],
      "links": { "github": "https://github.com/example/knowledge-base", "demo": "https://kb-demo.example.com" },
      "featured": false
    },
    {
      "id": "api-gateway",
      "name": "API Gateway",
      "summary": "High-performance API gateway with rate limiting, auth, and routing",
      "description": "## Overview\n\nCustom API gateway handling 10k+ requests/second with dynamic routing.",
      "techStack": ["Go", "Redis", "gRPC", "Docker"],
      "images": [],
      "links": { "github": "https://github.com/example/api-gateway", "demo": null },
      "featured": false
    }
  ]
}
```

```vue
<!-- src/views/ProjectDetail.vue -->
<template>
  <div class="detail-page">
    <div v-if="project">
      <router-link to="/" class="back-link">&larr; Back to projects</router-link>
      <div class="detail-layout">
        <div class="detail-gallery">
          <ImageGallery :images="project.images" />
        </div>
        <div class="detail-info">
          <h1 class="detail-name">{{ project.name }}</h1>
          <div class="detail-tags">
            <TechTag v-for="tech in project.techStack" :key="tech" :text="tech" />
          </div>
          <div class="detail-description" v-html="renderedDescription"></div>
          <div v-if="project.links.github || project.links.demo" class="detail-links">
            <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noopener" class="detail-link">GitHub</a>
            <a v-if="project.links.demo" :href="project.links.demo" target="_blank" rel="noopener" class="detail-link">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Project not found</h2>
      <router-link to="/">&larr; Back to projects</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useProjects } from '@/composables/useProjects.js'
import TechTag from '@/components/TechTag.vue'
import ImageGallery from '@/components/ImageGallery.vue'

const route = useRoute()
const { getProjectById } = useProjects()
const project = computed(() => getProjectById(route.params.id))
const renderedDescription = computed(() => {
  if (!project.value) return ''
  return marked(project.value.description)
})
</script>

<style scoped>
.detail-page {
  padding: 80px 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #58a6ff;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-layout {
  display: flex;
  gap: 40px;
}

.detail-gallery {
  flex: 1;
  min-width: 0;
}

.detail-info {
  flex: 1;
  min-width: 0;
}

.detail-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #c9d1d9;
  margin: 0 0 12px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.detail-description {
  color: #c9d1d9;
  font-size: 0.95rem;
  line-height: 1.7;
}

.detail-description :deep(h2) {
  font-size: 1.1rem;
  margin: 20px 0 8px;
  color: #c9d1d9;
}

.detail-description :deep(ul) {
  padding-left: 20px;
}

.detail-description :deep(li) {
  margin-bottom: 4px;
  color: #8b949e;
}

.detail-description :deep(strong) {
  color: #c9d1d9;
}

.detail-links {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.detail-link {
  display: inline-block;
  padding: 8px 20px;
  font-size: 0.9rem;
  color: #c9d1d9;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.detail-link:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}

.not-found {
  text-align: center;
  padding: 60px 24px;
}

.not-found h2 {
  font-size: 1.5rem;
  color: #c9d1d9;
  margin-bottom: 16px;
}

.not-found a {
  color: #58a6ff;
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-layout {
    flex-direction: column;
  }
}
</style>
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/integration/project-flow.spec.js
```

Expected: PASS — 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/views/HomePage.vue src/views/ProjectDetail.vue src/data/projects.json tests/integration/project-flow.spec.js
git commit -m "feat: wire up HomePage and ProjectDetail views"
```

---

### Task 12: Create ImageGallery Component (TDD)

**Files:**
- Create: `src/components/ImageGallery.vue`
- Create: `tests/unit/ImageGallery.spec.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/unit/ImageGallery.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageGallery from '@/components/ImageGallery.vue'

const images = [
  { src: '/img1.png', alt: 'Image 1' },
  { src: '/img2.png', alt: 'Image 2' },
  { src: '/img3.png', alt: 'Image 3' }
]

describe('ImageGallery', () => {
  it('shows placeholder when no images', () => {
    const wrapper = mount(ImageGallery, { props: { images: [] } })
    expect(wrapper.text()).toContain('No screenshots')
  })

  it('renders main image from first image', () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const mainImg = wrapper.find('.gallery-main img')
    expect(mainImg.attributes('src')).toBe('/img1.png')
    expect(mainImg.attributes('alt')).toBe('Image 1')
  })

  it('renders thumbnail for each image', () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    expect(thumbs).toHaveLength(3)
  })

  it('clicking thumbnail changes active image', async () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    await thumbs[1].trigger('click')
    const mainImg = wrapper.find('.gallery-main img')
    expect(mainImg.attributes('src')).toBe('/img2.png')
  })

  it('active thumbnail has active class', async () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    await thumbs[2].trigger('click')
    expect(thumbs[2].classes()).toContain('active')
    expect(thumbs[0].classes()).not.toContain('active')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/unit/ImageGallery.spec.js
```

Expected: FAIL.

- [ ] **Step 3: Write ImageGallery.vue**

```vue
<template>
  <div class="gallery">
    <div v-if="images.length === 0" class="gallery-placeholder">
      No screenshots available
    </div>
    <template v-else>
      <div class="gallery-main">
        <img :src="images[activeIndex].src" :alt="images[activeIndex].alt" />
      </div>
      <div class="gallery-thumbnails">
        <button
          v-for="(img, idx) in images"
          :key="img.src"
          class="gallery-thumb"
          :class="{ active: idx === activeIndex }"
          @click="activeIndex = idx"
        >
          <img :src="img.src" :alt="img.alt" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  images: { type: Array, required: true }
})

const activeIndex = ref(0)
</script>

<style scoped>
.gallery {
  width: 100%;
}

.gallery-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 8px;
  color: #484f58;
  font-size: 0.9rem;
}

.gallery-main {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #21262d;
  background: #0d1117;
}

.gallery-main img {
  width: 100%;
  display: block;
  object-fit: contain;
  max-height: 400px;
}

.gallery-thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.gallery-thumb {
  width: 60px;
  height: 40px;
  padding: 0;
  border: 2px solid #21262d;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #0d1117;
  transition: border-color 0.15s;
}

.gallery-thumb.active {
  border-color: #58a6ff;
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/unit/ImageGallery.spec.js
```

Expected: PASS — 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ImageGallery.vue tests/unit/ImageGallery.spec.js
git commit -m "feat: add ImageGallery component"
```

---

### Task 13: Create App.vue and main.js

**Files:**
- Create: `src/App.vue`
- Create: `src/main.js`

- [ ] **Step 1: Write App.vue**

```vue
<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
  -webkit-font-smoothing: antialiased;
}

a {
  color: #58a6ff;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
}

.main-content {
  padding-top: 56px;
}
</style>
```

- [ ] **Step 2: Write main.js**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 3: Verify the build works**

```bash
npx vite build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 4: Verify the dev server works**

```bash
npx vite --host 0.0.0.0 &
sleep 3 && curl -s http://localhost:5173 | head -20
```

Expected: Returns HTML content.

- [ ] **Step 5: Commit**

```bash
git add src/App.vue src/main.js
git commit -m "feat: add App.vue and main.js entry point"
```

---

### Task 14: Write Global CSS

**Files:**
- Create: `src/assets/styles/main.css`

- [ ] **Step 1: Write main.css**

```css
html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0d1117;
}

::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #484f58;
}

::selection {
  background: rgba(88, 166, 255, 0.3);
}
```

- [ ] **Step 2: Import in main.js**

Add this line to `src/main.js` at the top:

```js
import '@/assets/styles/main.css'
```

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/assets/styles/main.css src/main.js
git commit -m "feat: add global CSS styles"
```

---

### Task 15: Set Up GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `scripts/deploy.sh`

- [ ] **Step 1: Write deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm run build

      - run: npm test

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 2: Write deploy.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Building..."
npm run build

echo "Running tests..."
npm test

echo "Build complete. Deploy via: git push origin main"
echo "Or set up GitHub Actions for automatic deployment."
```

- [ ] **Step 3: Make deploy.sh executable**

```bash
chmod +x scripts/deploy.sh
```

- [ ] **Step 4: Write lint.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Running linter..."
npx eslint . --ext .vue,.js 2>/dev/null || echo "ESLint not configured yet — install and configure to enable linting"
```

- [ ] **Step 5: Make lint.sh executable**

```bash
chmod +x scripts/lint.sh
```

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml scripts/deploy.sh scripts/lint.sh
git commit -m "ci: add GitHub Actions deploy workflow"
```

---

### Task 16: Write Documentation

**Files:**
- Create: `AGENTS.md`
- Create: `README.md`
- Create: `docs/index.md`
- Create: `docs/architecture/overview.md`
- Create: `docs/architecture/component-tree.md`
- Create: `docs/architecture/adr/0001-use-vue-vite.md`
- Create: `docs/architecture/adr/0002-github-pages-deploy.md`
- Create: `docs/testing/testing-strategy.md`
- Create: `docs/testing/tdd-guide.md`
- Create: `docs/testing/test-data.md`
- Create: `docs/ai/coding-rules.md`
- Create: `docs/ai/context-map.md`
- Create: `docs/ai/review-checklist.md`

- [ ] **Step 1: Write AGENTS.md**

```markdown
# AGENTS.md

## Project: Personal Portfolio

A Vue 3 + Vite SPA portfolio deployed on GitHub Pages.

## Instructions

- All code changes must follow TDD: write failing test → implement → verify green
- Run `npm test` before committing
- Project data lives in `src/data/projects.json` — add new projects there
- Use Vue 3 Composition API (`<script setup>`) for all components
- Hash mode routing (required for GitHub Pages)
```

- [ ] **Step 2: Write README.md**

```markdown
# Portfolio

Personal portfolio built with Vue 3 + Vite. Deployed on GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |

## Adding a Project

Edit `src/data/projects.json` and add a new entry:

```json
{
  "id": "my-new-project",
  "name": "My New Project",
  "summary": "Short description",
  "description": "Full Markdown description...",
  "techStack": ["Tech1", "Tech2"],
  "images": [{ "src": "/images/screenshot.png", "alt": "Screenshot" }],
  "links": { "github": "https://...", "demo": null },
  "featured": false
}
```

Place images in `public/images/`.
```

- [ ] **Step 3: Write architecture docs**

`docs/index.md`:

```markdown
# Portfolio Documentation

- [Architecture Overview](architecture/overview.md)
- [Component Tree](architecture/component-tree.md)
- [ADR: Vue + Vite](architecture/adr/0001-use-vue-vite.md)
- [ADR: GitHub Pages Deploy](architecture/adr/0002-github-pages-deploy.md)
- [Testing Strategy](testing/testing-strategy.md)
- [TDD Guide](testing/tdd-guide.md)
- [Coding Rules](ai/coding-rules.md)
```

`docs/architecture/overview.md`:

```markdown
# Architecture Overview

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build:** Vite
- **Router:** vue-router (hash mode)
- **Testing:** Vitest + @vue/test-utils
- **Markdown:** marked
- **Deploy:** GitHub Actions → gh-pages

## Key Design Decisions

1. **Hash mode routing** — GitHub Pages doesn't support SPA history mode without server config
2. **JSON data source** — Projects stored in `projects.json`, consumed via `useProjects` composable. No backend needed.
3. **Component hierarchy** — App → NavBar + router-view → views → child components. Views are thin composers, components hold the logic.
4. **Scoped CSS** — Each component owns its styles. Global CSS only for resets and scrollbar.
```

`docs/architecture/component-tree.md`:

```markdown
# Component Tree

```
App.vue
├── NavBar.vue
└── <router-view>
    ├── HomePage.vue
    │   ├── HeroSection.vue
    │   └── ProjectGrid.vue
    │       └── ProjectCard.vue × N
    │           └── TechTag.vue × N
    └── ProjectDetail.vue
        ├── ImageGallery.vue
        └── TechTag.vue × N
```

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| NavBar | Fixed top navigation with site name and external links |
| HeroSection | Avatar, name, tagline, social links |
| ProjectGrid | Fetches projects via useProjects, renders grid of ProjectCards |
| ProjectCard | Clickable card: cover image, name, summary, tech tags, featured badge |
| TechTag | Small pill badge for a single technology name |
| ImageGallery | Large image + clickable thumbnail strip |
| HomePage | Composes HeroSection + ProjectGrid |
| ProjectDetail | Fetches project by route param, renders ImageGallery + info |
```

`docs/architecture/adr/0001-use-vue-vite.md`:

```markdown
# ADR-0001: Use Vue 3 + Vite

**Date:** 2026-05-20
**Status:** Accepted

## Context

Need a frontend framework for a personal portfolio deployed on GitHub Pages.

## Decision

Vue 3 with Vite as build tool.

## Rationale

- Vue 3 Composition API provides clean component model
- Vite offers fast dev server and optimized production builds
- vue-router hash mode works natively with GitHub Pages
- Small learning curve, good Chinese documentation
- Vitest integrates natively with Vite for testing

## Alternatives Considered

- **React + CRA:** Heavier, CRA is deprecated
- **Nuxt:** Overkill for a 2-page portfolio
- **Pure HTML/CSS:** Not extensible enough
```

`docs/architecture/adr/0002-github-pages-deploy.md`:

```markdown
# ADR-0002: GitHub Pages Deployment via Actions

**Date:** 2026-05-20
**Status:** Accepted

## Context

Need to deploy the portfolio publicly at zero cost.

## Decision

GitHub Actions builds and deploys to gh-pages branch on push to main.

## Rationale

- Free hosting with custom domain support
- CI/CD fully integrated with GitHub
- `peaceiris/actions-gh-pages` action handles deployment
- Hash mode router avoids 404 issues with SPA

## Alternatives Considered

- **Vercel/Netlify:** Also good options, but GitHub Pages keeps everything in one place
- **Manual deploy:** Error-prone, no CI
```

- [ ] **Step 4: Write testing docs**

`docs/testing/testing-strategy.md`:

```markdown
# Testing Strategy

## Layers

| Layer | Tool | What it tests |
|-------|------|---------------|
| Unit | Vitest + @vue/test-utils | Individual components render correctly with given props |
| Integration | Vitest + vue-router | Route resolution, navigation between views |
| E2E | Not in v1 | Full browser testing (Playwright candidate) |

## Principles

1. **TDD always** — write the test first, watch it fail, then implement
2. **Test behavior, not implementation** — assert what the user sees, not internal state
3. **One assertion per test case** — makes failures immediately clear
4. **Use fixtures** — `tests/fixtures/` provides sample data, tests never import from `src/data/`

## Running Tests

```bash
npm test              # single run
npm run test:watch    # watch mode
```
```

`docs/testing/tdd-guide.md`:

```markdown
# TDD Guide

## Cycle

1. **Red** — Write a failing test that describes the desired behavior
2. **Green** — Write the minimal code to make the test pass
3. **Refactor** — Clean up while tests stay green
4. **Commit** — One commit per component/feature

## Example

```bash
# 1. Write test in tests/unit/MyComponent.spec.js
# 2. Run and see it fail
npx vitest run tests/unit/MyComponent.spec.js
# 3. Implement MyComponent.vue
# 4. Run and see it pass
npx vitest run tests/unit/MyComponent.spec.js
# 5. Commit
git add src/components/MyComponent.vue tests/unit/MyComponent.spec.js
git commit -m "feat: add MyComponent"
```
```

`docs/testing/test-data.md`:

```markdown
# Test Data

Test fixtures live in `tests/fixtures/`. Never import from `src/data/projects.json` in tests.

## sample-projects.js

Provides 4 sample projects covering:
- Featured and non-featured projects
- Projects with and without images
- Projects with and without demo links
- Various tech stacks

## Adding Fixtures

When adding new project fields, update both:
1. `src/data/projects.json` — the real data
2. `tests/fixtures/sample-projects.js` — the test data

Keep them structurally identical.
```

- [ ] **Step 5: Write AI docs**

`docs/ai/coding-rules.md`:

```markdown
# Coding Rules

## Vue Components

- Use `<script setup>` syntax
- Props: define with `defineProps({ ... })`
- No mixins, no options API
- Scoped styles in each component

## Naming

- Components: `PascalCase` — `ProjectCard.vue`
- Composables: `camelCase` with `use` prefix — `useProjects.js`
- CSS classes: `kebab-case` — `.section-title`

## File Organization

- One component per file
- Views compose components, don't contain complex logic
- Composables handle data and business logic
- JSON for static data, composables for reactive access
```

`docs/ai/context-map.md`:

```markdown
# Context Map

## Key Files

| File | Purpose |
|------|---------|
| `src/main.js` | App entry, mounts Vue + router |
| `src/App.vue` | Root component, NavBar + router-view |
| `src/router/index.js` | Hash routes: `/`, `/project/:id`, catch-all |
| `src/composables/useProjects.js` | Data access layer for projects.json |
| `src/data/projects.json` | Single source of truth for project content |

## Adding a New Page

1. Create `src/views/NewPage.vue`
2. Add route in `src/router/index.js`
3. Add link in `NavBar.vue` or relevant component
4. Write tests
```

`docs/ai/review-checklist.md`:

```markdown
# Review Checklist

- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] New components follow `<script setup>` convention
- [ ] Scoped styles where appropriate
- [ ] No hardcoded personal data in components (use JSON)
- [ ] Route works in hash mode
- [ ] Mobile responsive
```

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md README.md docs/
git commit -m "docs: add project documentation"
```

---

### Task 17: Run Full Test Suite and Verify

- [ ] **Step 1: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass (useProjects: 4, router: 3, TechTag: 1, NavBar: 2, HeroSection: 2, ProjectCard: 5, ProjectGrid: 3, ImageGallery: 5, project-flow: 2 = 27 tests).

- [ ] **Step 2: Run production build**

```bash
npx vite build
```

Expected: Build succeeds, `dist/` directory created.

- [ ] **Step 3: Commit if any fixes were needed, else finalize**

```bash
git add -A
git commit -m "chore: final verification — all tests pass, build succeeds"
```

---

## Summary

| Task | Component | Test Count |
|------|-----------|------------|
| 1 | Scaffold | 0 |
| 2 | Directory structure | 0 |
| 3 | Fixtures | 0 |
| 4 | useProjects | 4 |
| 5 | Router | 3 |
| 6 | TechTag | 1 |
| 7 | NavBar | 2 |
| 8 | HeroSection | 2 |
| 9 | ProjectCard | 5 |
| 10 | ProjectGrid | 3 |
| 11 | HomePage + ProjectDetail | 2 |
| 12 | ImageGallery | 5 |
| 13 | App.vue + main.js | 0 |
| 14 | Global CSS | 0 |
| 15 | Deployment | 0 |
| 16 | Documentation | 0 |
| 17 | Verification | 0 |
| **Total** | | **27** |

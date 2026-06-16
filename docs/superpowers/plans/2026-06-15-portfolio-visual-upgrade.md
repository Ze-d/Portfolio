# Portfolio 视觉升级实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Portfolio 从 GitHub Dark 风格升级为「极致暗黑 + 暖金点缀」视觉系统，覆盖配色、排版、组件、动效。

**Architecture:** CSS Custom Properties 驱动全局设计 token，Google Fonts 引入 Inter 字体，Vue 3 scoped styles 引用变量。所有颜色通过 `var(--token)` 引用，便于后续主题扩展。

**Tech Stack:** Vue 3 + Vite + CSS Custom Properties + Inter (Google Fonts)

**Source spec:** `docs/superpowers/specs/2026-06-15-portfolio-visual-upgrade-design.md`

---

## File Structure

| 文件 | 操作 | 职责 |
|------|------|------|
| `index.html` | 修改 | 添加 Google Fonts `<link>` (Inter 400/500/600/700) |
| `src/assets/styles/main.css` | 修改 | `:root` CSS 变量定义、全局重置增强 |
| `src/App.vue` | 修改 | 全局样式迁移到 CSS 变量、路由过渡动画 |
| `src/components/NavBar.vue` | 修改 | 配色变量化、高度微调、滚动阴影 |
| `src/components/HeroSection.vue` | 修改 | 头像光晕、入场动画、按钮分层 |
| `src/components/TechTag.vue` | 修改 | 暖金配色 |
| `src/components/ProjectCard.vue` | 修改 | 卡片质感、hover 动效、badge 改色 |
| `src/components/ProjectGrid.vue` | 修改 | 间距微调、标题样式 |
| `src/components/ImageGallery.vue` | 修改 | 选中态金色、过渡动画 |
| `src/views/ProjectDetail.vue` | 修改 | 链接金色、按钮分层、Markdown 样式 |

---

### Task 1: CSS 变量基础设施 + 字体引入

**Files:**
- Modify: `index.html`
- Modify: `src/assets/styles/main.css`

- [ ] **Step 1: 在 index.html 添加 Inter 字体**

将 `<head>` 中在 `<link rel="icon">` 之后插入 Google Fonts：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 重写 main.css 为完整 CSS 变量系统**

用以下内容完全替换 `src/assets/styles/main.css`：

```css
/* ============================================
   Portfolio Design System — CSS Custom Properties
   Style: Ultra-dark + Warm Gold
   ============================================ */

:root {
  /* ---- Background ---- */
  --bg-deep: #050505;
  --bg-surface: #0a0a0a;
  --bg-raised: #111111;

  /* ---- Text ---- */
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-tertiary: #666666;

  /* ---- Border ---- */
  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-default: rgba(255, 255, 255, 0.06);
  --border-strong: rgba(255, 255, 255, 0.10);

  /* ---- Accent: Warm Gold ---- */
  --accent: #d4a574;
  --accent-strong: rgba(212, 167, 116, 0.25);
  --accent-subtle: rgba(212, 167, 116, 0.10);
  --accent-muted: rgba(212, 167, 116, 0.08);

  /* ---- Typography ---- */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* ---- Type Scale ---- */
  --text-3xl: 2rem;      /* 32px — Hero name */
  --text-2xl: 1.625rem;  /* 26px — Section title */
  --text-xl: 1.25rem;    /* 20px — Featured section */
  --text-lg: 1rem;       /* 16px — Project title */
  --text-base: 0.875rem; /* 14px — Body */
  --text-sm: 0.75rem;    /* 12px — Summary */
  --text-xs: 0.6875rem;  /* 11px — Tags, labels */

  /* ---- Spacing ---- */
  --space-unit: 4px;

  /* ---- Motion ---- */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-entrance: 400ms;
}

/* ---- Reset & Base ---- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.65;
  font-size: var(--text-base);
}

/* ---- Links ---- */
a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out-expo);
}

a:hover {
  text-decoration: underline;
}

/* ---- Selection ---- */
::selection {
  background: var(--accent-subtle);
  color: var(--text-primary);
}

/* ---- Scrollbar ---- */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-deep);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.14);
}

/* ---- Focus ---- */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

- [ ] **Step 3: 验证构建**

```bash
npm run build
```

期望：构建成功，无 CSS 相关错误。

- [ ] **Step 4: Commit**

```bash
git add index.html src/assets/styles/main.css
git commit -m "feat: add CSS custom properties and Inter font — design token foundation"
```

---

### Task 2: App.vue 全局样式迁移 + 路由过渡

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: 重写 App.vue 模板和样式**

用以下内容替换 `src/App.vue` 的 `<style>` 块，`<template>` 和 `<script>` 不变：

```vue
<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
/* 全局样式已迁移至 src/assets/styles/main.css */
/* 此处仅保留 App 级布局样式 */
</style>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--bg-deep);
}

.main-content {
  padding-top: 52px;
}

/* ---- Route Transition ---- */
.page-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out-expo),
              transform var(--duration-slow) var(--ease-out-expo);
}

.page-leave-active {
  transition: opacity 150ms var(--ease-out-expo);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
}
</style>
```

关键变更：
- `padding-top` 从 56px → 52px（匹配新 NavBar 高度）
- 全局 `body`/`a` 样式已移至 `main.css`，此处删除
- 添加 `<transition name="page" mode="out-in">` 实现路由切换动画

- [ ] **Step 2: 验证 dev server**

```bash
npm run dev
```

打开浏览器确认页面能正常加载，路由切换有淡入动画。

- [ ] **Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: migrate global styles to CSS variables, add route transition"
```

---

### Task 3: NavBar 升级

**Files:**
- Modify: `src/components/NavBar.vue`

- [ ] **Step 1: 重写 NavBar 样式**

用以下内容替换 `src/components/NavBar.vue` 的 `<style scoped>` 块：

```vue
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
  height: 52px;
  background: rgba(5, 5, 5, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  transition: border-color var(--duration-normal) var(--ease-out-expo),
              box-shadow var(--duration-normal) var(--ease-out-expo);
}

.navbar.scrolled {
  border-bottom-color: var(--border-default);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
}

.navbar-brand {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out-expo);
}

.navbar-links a:hover {
  color: var(--accent);
  text-decoration: none;
}
</style>
```

- [ ] **Step 2: 添加滚动检测逻辑（script 部分）**

将 `<script setup>` 替换为：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
```

- [ ] **Step 3: 模板绑定 scrolled class**

将 `<nav class="navbar">` 改为：

```vue
<nav class="navbar" :class="{ scrolled }">
```

- [ ] **Step 4: 验证**

```bash
npm run dev
```

确认：NavBar 高度 52px，滚动后底部边框加深 + 阴影出现，链接 hover 变金色。

- [ ] **Step 5: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat: upgrade NavBar — CSS variables, scroll shadow, warm gold hover"
```

---

### Task 4: HeroSection 升级

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: 重写模板**

```vue
<template>
  <section class="hero">
    <div class="hero-avatar-wrapper">
      <img class="hero-avatar" src="../assets/images/avatar.png" alt="Avatar" />
    </div>
    <h1 class="hero-name">JinYuan Zhang</h1>
    <p class="hero-tagline">AI Native Engineer & Developer</p>
    <div class="hero-links">
      <a href="https://github.com/Ze-d" target="_blank" rel="noopener" class="hero-link hero-link--primary">GitHub</a>
      <!-- <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" class="hero-link">LinkedIn</a> -->
    </div>
  </section>
</template>
```

- [ ] **Step 2: 重写样式**

```vue
<style scoped>
.hero {
  text-align: center;
  padding: 80px 24px 48px;
}

.hero-avatar-wrapper {
  display: inline-block;
  margin-bottom: 24px;
}

.hero-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-raised);
  border: 1px solid var(--border-default);
  box-shadow: 0 0 40px var(--accent-muted);
  display: block;
  animation: avatar-enter var(--duration-entrance) var(--ease-out-expo) both;
}

@keyframes avatar-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-name {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.03em;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 100ms both;
}

.hero-tagline {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0 0 28px;
  letter-spacing: -0.01em;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 200ms both;
}

.hero-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 300ms both;
}

.hero-link {
  display: inline-block;
  padding: 7px 18px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: border-color var(--duration-fast) var(--ease-out-expo),
              color var(--duration-fast) var(--ease-out-expo),
              background var(--duration-fast) var(--ease-out-expo);
}

.hero-link:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  text-decoration: none;
}

.hero-link--primary {
  color: var(--accent);
  background: var(--accent-muted);
  border-color: rgba(212, 167, 116, 0.12);
}

.hero-link--primary:hover {
  color: var(--accent);
  border-color: var(--accent-strong);
  background: var(--accent-subtle);
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 24px 36px;
  }

  .hero-avatar {
    width: 72px;
    height: 72px;
  }

  .hero-name {
    font-size: 1.625rem;
  }
}
</style>
```

- [ ] **Step 3: 验证**

```bash
npm run dev
```

确认：头像有发光晕 + 入场缩放动画，名字淡入上移，按钮分主次（GitHub 金边 vs 其他灰边）。

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: upgrade HeroSection — avatar glow, entrance animation, primary/secondary buttons"
```

---

### Task 5: TechTag 升级

**Files:**
- Modify: `src/components/TechTag.vue`

- [ ] **Step 1: 更新配色为暖金**

用以下内容替换 `<style scoped>`：

```vue
<style scoped>
.tech-tag {
  display: inline-block;
  padding: 2px 9px;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-muted);
  border-radius: 9999px;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: background var(--duration-fast) var(--ease-out-expo);
}

.tech-tag:hover {
  background: var(--accent-subtle);
}
</style>
```

- [ ] **Step 2: 验证**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TechTag.vue
git commit -m "feat: upgrade TechTag to warm gold color scheme"
```

---

### Task 6: ProjectCard 升级

**Files:**
- Modify: `src/components/ProjectCard.vue`

- [ ] **Step 1: 更新卡片样式**

用以下内容替换 `<style scoped>`：

```vue
<style scoped>
.card {
  display: block;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color var(--duration-normal) var(--ease-out-expo),
              transform var(--duration-normal) var(--ease-out-expo),
              box-shadow var(--duration-normal) var(--ease-out-expo);
}

.card:hover {
  border-color: var(--border-default);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: var(--bg-deep);
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out-expo);
}

.card:hover .card-image img {
  transform: scale(1.03);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f0f0f 0%, #141414 100%);
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--bg-deep);
  background: var(--accent);
  border-radius: 9999px;
  letter-spacing: 0.01em;
}

.card-body {
  padding: 18px;
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.card-summary {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0 0 14px;
  line-height: 1.55;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
```

关键变更：
- 背景 `#161b22` → `var(--bg-surface)`
- 圆角 8px → 10px
- hover: + `translateY(-2px)` + `box-shadow`
- hover 图片微放大 (1.03x)
- Featured badge 蓝色 → 暖金实色
- body 内边距 16px → 18px

- [ ] **Step 2: 验证**

```bash
npm run dev
```

确认：卡片 hover 上浮 + 阴影，Featured badge 金色，图片 hover 微放大。

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.vue
git commit -m "feat: upgrade ProjectCard — card texture, hover lift, warm gold badge"
```

---

### Task 7: ProjectGrid 升级

**Files:**
- Modify: `src/components/ProjectGrid.vue`

- [ ] **Step 1: 更新 Section 标题和间距**

用以下内容替换 `<style scoped>`：

```vue
<style scoped>
.projects {
  padding: 0 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-subtle);
  letter-spacing: -0.02em;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 32px;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
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

关键变更：
- Section 标题字号统一用 `--text-xl`
- 标题下方分割线 + 金色短线装饰（`::after` 伪元素）
- Section 间距 40px → 48px
- 标题下边距 16px → 20px，分割线 padding 8px → 10px

- [ ] **Step 2: 验证**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectGrid.vue
git commit -m "feat: upgrade ProjectGrid — section title decoration, spacing refinement"
```

---

### Task 8: ImageGallery 升级

**Files:**
- Modify: `src/components/ImageGallery.vue`

- [ ] **Step 1: 更新画廊样式**

用以下内容替换 `<style scoped>`：

```vue
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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.gallery-main {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-deep);
}

.gallery-main img {
  width: 100%;
  display: block;
  object-fit: contain;
  max-height: 400px;
  transition: opacity var(--duration-normal) var(--ease-out-expo);
}

.gallery-thumbnails {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.gallery-thumb {
  width: 56px;
  height: 36px;
  padding: 0;
  border: 1.5px solid var(--border-subtle);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-deep);
  transition: border-color var(--duration-fast) var(--ease-out-expo);
}

.gallery-thumb.active {
  border-color: var(--accent);
}

.gallery-thumb:hover {
  border-color: var(--border-strong);
}

.gallery-thumb.active:hover {
  border-color: var(--accent);
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
```

关键变更：
- 主图/占位圆角 8px → 10px
- 缩略图选中态 `#58a6ff` → `var(--accent)` 暖金
- 缩略图 hover 增加反馈
- 主图图片添加 opacity 过渡

- [ ] **Step 2: 验证**

```bash
npm run dev
```

确认：画廊缩略图选中态为金色边框，hover 有反馈。

- [ ] **Step 3: Commit**

```bash
git add src/components/ImageGallery.vue
git commit -m "feat: upgrade ImageGallery — warm gold active state, transition polish"
```

---

### Task 9: ProjectDetail 升级

**Files:**
- Modify: `src/views/ProjectDetail.vue`

- [ ] **Step 1: 更新详情页样式**

用以下内容替换 `<style scoped>`：

```vue
<style scoped>
.detail-page {
  padding: 80px 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: 24px;
  transition: opacity var(--duration-fast) var(--ease-out-expo);
}

.back-link:hover {
  opacity: 0.8;
  text-decoration: none;
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
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.detail-description {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
}

.detail-description :deep(h2) {
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 24px 0 10px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.detail-description :deep(h3) {
  font-size: var(--text-base);
  font-weight: 600;
  margin: 18px 0 8px;
  color: var(--text-primary);
}

.detail-description :deep(ul) {
  padding-left: 20px;
}

.detail-description :deep(li) {
  margin-bottom: 4px;
  color: var(--text-secondary);
}

.detail-description :deep(li::marker) {
  color: var(--text-tertiary);
}

.detail-description :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.detail-description :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  padding: 2px 6px;
  background: var(--bg-raised);
  border-radius: 3px;
  color: var(--accent);
}

.detail-links {
  display: flex;
  gap: 10px;
  margin-top: 28px;
}

.detail-link {
  display: inline-block;
  padding: 8px 18px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: border-color var(--duration-fast) var(--ease-out-expo),
              color var(--duration-fast) var(--ease-out-expo),
              background var(--duration-fast) var(--ease-out-expo);
}

.detail-link:first-child {
  color: var(--accent);
  background: var(--accent-muted);
  border-color: rgba(212, 167, 116, 0.12);
}

.detail-link:first-child:hover {
  border-color: var(--accent-strong);
  background: var(--accent-subtle);
}

.detail-link:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 24px;
}

.not-found h2 {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.not-found a {
  color: var(--accent);
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-layout {
    flex-direction: column;
  }
}
</style>
```

关键变更：
- 所有颜色迁移到 CSS 变量
- Back 链接 `#58a6ff` → `var(--accent)` 暖金
- 详情按钮分主次：第一个链接（GitHub）用金色，其余灰色
- Markdown 渲染样式适配新配色：`li::marker` 颜色、`code` 用暖金
- 标题字号和间距微调

- [ ] **Step 2: 验证**

```bash
npm run dev
# 访问 /project/agent-pulse 查看详情页效果
```

确认：Back 链接金色，GitHub 按钮金边优先，Markdown 内容样式正确。

- [ ] **Step 3: Commit**

```bash
git add src/views/ProjectDetail.vue
git commit -m "feat: upgrade ProjectDetail — warm gold accent, primary/secondary buttons, markdown polish"
```

---

### Task 10: 构建验证 + 最终检查

**Files:** 无新建，全量检查

- [ ] **Step 1: 全量构建**

```bash
npm run build
```

期望：构建成功，无警告，无 CSS 错误。

- [ ] **Step 2: 运行测试**

```bash
npm test
```

期望：所有已有测试通过，无 regression。

- [ ] **Step 3: 检查 CSS 变量覆盖**

确认没有遗漏的硬编码颜色：

```bash
grep -rn '#0d1117\|#161b22\|#c9d1d9\|#8b949e\|#58a6ff\|#21262d\|#30363d\|#484f58' src/
```

期望：**零匹配**（所有旧颜色已被替换）。

- [ ] **Step 4: 启动预览做视觉走查**

```bash
npm run preview
```

逐页检查：
- [ ] 首页：NavBar + Hero + ProjectGrid 整体配色协调
- [ ] 卡片 hover：上浮 + 阴影 + 图片微放大
- [ ] 详情页：Back 链接金色 + 画廊选中态金色
- [ ] 响应式：640px 单列，768px 详情页上下布局
- [ ] 路由切换：淡入 + 微上移动画

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final verification — all hardcoded colors migrated, build passes"
```

---

## 任务总结

| # | 任务 | 文件 | 预计时间 |
|---|------|------|---------|
| 1 | CSS 变量 + Inter 字体 | `main.css`, `index.html` | 5min |
| 2 | App.vue 迁移 + 路由过渡 | `App.vue` | 5min |
| 3 | NavBar 升级 | `NavBar.vue` | 8min |
| 4 | HeroSection 升级 | `HeroSection.vue` | 8min |
| 5 | TechTag 升级 | `TechTag.vue` | 3min |
| 6 | ProjectCard 升级 | `ProjectCard.vue` | 5min |
| 7 | ProjectGrid 升级 | `ProjectGrid.vue` | 3min |
| 8 | ImageGallery 升级 | `ImageGallery.vue` | 3min |
| 9 | ProjectDetail 升级 | `ProjectDetail.vue` | 5min |
| 10 | 构建验证 + 最终检查 | 全量 | 5min |

**总预计时间：~50min**

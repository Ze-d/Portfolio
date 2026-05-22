# Portfolio 内容填充指南

## 目录

1. [添加/修改项目](#添加项目)
2. [修改个人信息](#修改个人信息)
3. [修改导航栏链接](#修改导航栏链接)
4. [添加项目图片](#添加项目图片)
5. [更换头像](#更换头像)
6. [调整主题样式](#调整主题样式)

---

## 添加项目

打开 `src/data/projects.json`，在 `"projects"` 数组中追加一条：

```json
{
  "id": "my-project",
  "name": "我的项目名",
  "summary": "一句话简介，会显示在首页卡片上",
  "description": "## 项目概述\n\n详细的项目描述，**支持 Markdown**。\n\n### 核心功能\n- 功能一\n- 功能二\n\n### 技术架构\n描述技术选型和架构设计...",
  "techStack": ["Vue", "Spring Boot", "Redis", "Docker"],
  "images": [
    { "src": "/images/my-project-01.png", "alt": "架构图" },
    { "src": "/images/my-project-02.png", "alt": "界面截图" }
  ],
  "links": {
    "github": "https://github.com/你的用户名/仓库名",
    "demo": "https://demo.example.com"
  },
  "featured": true
}
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | URL 标识，全站唯一，建议用 kebab-case |
| `name` | 是 | 项目名称 |
| `summary` | 是 | 首页卡片上的短描述（1-2 句话） |
| `description` | 是 | 详情页描述，**完整支持 Markdown** |
| `techStack` | 是 | 技术标签数组 |
| `images` | 是 | 截图数组，可为空数组 `[]` |
| `images[].src` | — | 图片路径，放在 `public/images/` 下 |
| `images[].alt` | — | 图片描述文字 |
| `links.github` | 否 | GitHub 链接，没有则填 `null` |
| `links.demo` | 否 | 在线 Demo 链接，没有则填 `null` |
| `featured` | 否 | `true` 在首页"Featured"区域置顶展示 |

完成编辑后提交推送即生效：

```bash
git add src/data/projects.json
git commit -m "content: add project - 我的项目名"
git push origin master
```

---

## 修改个人信息

打开 `src/components/HeroSection.vue`，修改模板区的内容：

```vue
<template>
  <section class="hero">
    <div class="hero-avatar"></div>
    <h1 class="hero-name">你的姓名</h1>
    <p class="hero-tagline">你的职位 / 技术方向</p>
    <div class="hero-links">
      <a href="https://github.com/你的用户名" ...>GitHub</a>
      <a href="https://linkedin.com/in/你的用户名" ...>LinkedIn</a>
      <!-- 可增删链接 -->
    </div>
  </section>
</template>
```

---

## 修改导航栏链接

打开 `src/components/NavBar.vue`，修改 `navbar-links` 里的链接：

```vue
<div class="navbar-links">
  <a href="https://github.com/你的用户名" target="_blank" rel="noopener">GitHub</a>
  <a href="https://你的博客地址" target="_blank" rel="noopener">Blog</a>
</div>
```

---

## 添加项目图片

1. 把截图放到 `public/images/` 目录下
2. 在 `projects.json` 的 `images` 字段中引用：

```json
"images": [
  { "src": "/images/project-name-01.png", "alt": "架构图" }
]
```

首张图片同时作为首页卡片的封面图。多张图片在详情页的 ImageGallery 中可切换查看。

**图片建议：**
- 格式：PNG 或 WebP
- 尺寸：宽度建议 1200px，高度适中
- 大小：尽量控制在 300KB 以内，保持加载速度

---

## 更换头像

在 `public/images/` 下放入头像文件（如 `avatar.png`），然后修改 `HeroSection.vue`：

```vue
<!-- 原来 -->
<div class="hero-avatar"></div>

<!-- 改为 -->
<img class="hero-avatar" src="/images/avatar.png" alt="Avatar" />
```

同时把 `.hero-avatar` 样式的 `background: #21262d;` 删掉或改为 `object-fit: cover;`。

---

## 调整主题样式

主题颜色分布在各个组件的 `<style scoped>` 中，主要颜色变量：

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景色 | `#0d1117` | 页面主背景 |
| 卡片背景 | `#161b22` | 项目卡片、详情区块 |
| 边框色 | `#21262d` | 卡片/区域分割线 |
| 主文字 | `#c9d1d9` | 标题、正文 |
| 次要文字 | `#8b949e` | 摘要、辅助信息 |
| 强调色 | `#58a6ff` | 标签、链接、hover 高亮 |

全局样式（滚动条、选中色）在 `src/assets/styles/main.css`，全局 reset 在 `src/App.vue` 的 `<style>` 块中。

---

## 本地预览

每次改完先本地看效果再推送：

```bash
npm run dev
# 浏览器打开 http://localhost:5173
```

确认没问题后：

```bash
git add .
git commit -m "content: 描述做了什么改动"
git push origin master
```

GitHub Actions 会自动构建部署，一分钟左右刷新线上页面即可看到更新。

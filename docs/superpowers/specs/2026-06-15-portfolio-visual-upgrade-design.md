# Portfolio 视觉升级设计文档

**日期：** 2026-06-15  
**状态：** 待评审  
**范围：** 全站视觉 — 配色、排版、组件、布局、动效

---

## 1. 设计目标

将现有 GitHub Dark 风格的个人 Portfolio 升级为**极致暗黑 + 暖金点缀**的视觉系统，兼顾**极简专业**（方案 A）与**精致排版**（方案 C），建立独特的个人品牌辨识度。

### 痛点定位

| 问题 | 解决方案 |
|------|---------|
| 配色单调，灰度过多 | 5 层灰阶 + 暖金强调色系统 |
| 排版不够精致 | Inter 字体 + 7 级字号量表 + 负 letter-spacing |
| 卡片缺乏质感 | 分层底色 + 微妙边框 + 光影层次 |
| 无动效/过渡 | 三层动效策略（即时反馈 / 页面节奏 / 愉悦细节） |
| 太像 GitHub 默认主题 | 全新配色系统，独立视觉语言 |

---

## 2. 配色系统

### 2.1 底色（3 层）

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg-deep` | `#050505` | 页面底色 |
| `--bg-surface` | `#0a0a0a` | 卡片、面板、NavBar 背景 |
| `--bg-raised` | `#111111` | hover 态、浮层 |

### 2.2 文字（3 级）

| Token | 色值 | 用途 |
|-------|------|------|
| `--text-primary` | `#f0f0f0` | 标题、正文 |
| `--text-secondary` | `#888888` | 辅助文字、摘要、导航链接 |
| `--text-tertiary` | `#666666` | 弱化文字、占位符、页脚 |

### 2.3 边框（3 档）

| Token | 色值 | 用途 |
|-------|------|------|
| `--border-subtle` | `rgba(255,255,255,0.04)` | 卡片默认边框、分割线 |
| `--border-default` | `rgba(255,255,255,0.06)` | 按钮边框、输入框 |
| `--border-strong` | `rgba(255,255,255,0.10)` | hover/active 边框 |

### 2.4 强调色 — 暖金

| Token | 色值 | 用途 |
|-------|------|------|
| `--accent` | `#d4a574` | 主强调色：链接、激活态、Featured badge |
| `--accent-strong` | `rgba(212,167,116,0.25)` | 发光、渐变、重点装饰 |
| `--accent-subtle` | `rgba(212,167,116,0.10)` | Tag 背景、微高亮 |
| `--accent-muted` | `rgba(212,167,116,0.08)` | 按钮次要背景、hover 底色 |

### 2.5 功能色

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-success` | `#3fb950` | 成功/在线状态（保留，极少使用） |
| `--color-warning` | `#d2991d` | 警告（保留） |
| `--color-error` | `#f85149` | 错误（保留） |

---

## 3. 排版系统

### 3.1 字体

- **主字体：** Inter（Google Fonts，woff2，subset latin）
- **后备：** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **等宽：** `'JetBrains Mono', 'Fira Code', monospace`（用于技术标签和代码）

### 3.2 字号量表（Type Scale）

| 级别 | 大小 | 行距 | 字间距 | 字重 | 用途 |
|------|------|------|--------|------|------|
| `3xl` | 32px | 1.2 | -0.03em | 700 | Hero 名字 |
| `2xl` | 26px | 1.3 | -0.02em | 700 | Section 标题 |
| `xl` | 20px | 1.3 | -0.02em | 600 | Featured 区块标题 |
| `lg` | 16px | 1.5 | -0.01em | 600 | 项目标题 |
| `base` | 14px | 1.65 | 0 | 400 | 正文 |
| `sm` | 12px | 1.5 | 0 | 400 | 摘要、辅助信息 |
| `xs` | 11px | 1.4 | +0.03em | 500 | 标签、说明文字 |

### 3.3 排版原则

- 标题统一负 letter-spacing（Inter 特性，增强现代感）
- 正文行距 >= 1.5 保证可读性
- 标签类文字大写 + 正 letter-spacing
- 中文内容不做负 letter-spacing

---

## 4. 组件设计

### 4.1 NavBar

- 高度：52px（从 56px 缩减）
- 背景：`rgba(5,5,5,0.96)` + `backdrop-filter: blur(16px)`
- 底部边框：`--border-subtle`
- 滚动触发：底部边框 + 微弱阴影渐显
- Brand 文字：15px / 700 / `--text-primary`

### 4.2 Hero Section

- 头像：88px 圆形，`--border-default` 边框 + 暖金微光晕 `box-shadow: 0 0 40px rgba(212,167,116,0.04)`
- 入场动画：`scale(0.8→1)` + 发光渐显，400ms ease-out
- 名字：32px / 700 / `--text-primary` / `letter-spacing: -0.03em`
- 头衔：15px / `--text-secondary`
- 按钮分主次：
  - 主按钮（如 GitHub）：金色文字 + 金色边框 + 金色微背景
  - 次按钮（如 LinkedIn）：灰色文字 + 灰色边框

### 4.3 ProjectCard

- 背景：`--bg-surface` + `--border-subtle`
- 圆角：10px
- Hover：边框 → `--border-default` + `translateY(-2px)` + 微弱阴影
- 图片区：180px 高，`linear-gradient(135deg, #0f0f0f, #141414)` 占位
- Featured badge：暖金实色底（`--accent`）+ 纯黑文字
- Tag：`--accent-muted` 背景 + `--accent` 文字色
- 内边距：18px

### 4.4 TechTag

- 统一风格：`--accent-muted` 背景 + `--accent` 文字
- 圆角 pill：`border-radius: 9999px`
- 尺寸：padding `2px 9px` / font `10.5px`
- Hover：背景加深至 `--accent-subtle`

### 4.5 ImageGallery

- 主图：圆角 10px + `--border-subtle`
- 缩略图选中态：`--accent` 边框（替代当前蓝色）
- 切换动画：交叉淡入 200ms

### 4.6 链接与按钮

- 主按钮（有号召性）：金色边框 + 金色背景
- 次按钮：`--bg-surface` + `--border-default`，hover 边框变 `--border-strong`
- 文字链接：`--accent` 色，hover 下划线

---

## 5. 布局与间距

### 5.1 基准间距

- 基准单位：4px
- 页面最大宽度：1100px（保持不变）
- 水平内边距：24px
- Section 间距：48px 上 / 64px 下

### 5.2 响应式

- 640px 断点：卡片网格 2 列 → 1 列
- 768px 断点：详情页 左右 → 上下布局
- 移动端字号微调：Hero 名字 32→26px，标题等比缩减

---

## 6. 动效系统

### 6.1 运动曲线

统一使用：`cubic-bezier(0.16, 1, 0.3, 1)`（ease-out-expo），利落不拖沓。

### 6.2 Layer 1 — 即时反馈（150-200ms）

- 链接/按钮 hover 颜色过渡
- 卡片 hover 边框 + 微上浮
- Tag hover 背景加深
- 缩略图选中态切换
- NavBar 链接 hover

### 6.3 Layer 2 — 页面节奏（300-400ms）

- 路由切换：`opacity 0→1` + `translateY(8px→0)`，300ms
- 图片画廊切换：交叉淡入，200ms
- Featured badge 入场：延迟 100ms + 弹性缓出

### 6.4 Layer 3 — 愉悦细节

- Hero 头像入场：缩放弹出 + 发光渐显，400ms
- Section 标题装饰线 hover 展开（伪元素 scaleX 0→1）
- NavBar 滚动阴影渐显（scroll-driven，CSS `@supports (animation-timeline: scroll())`）
- 卡片图片区 placeholder 呼吸渐变（可选，8s 循环）

### 6.5 不做的

- 滚动视差
- 光标追随效果
- 超过 500ms 的入场动画
- 页面级的滚动触发动画（过于花哨）

---

## 7. 实现策略

### 7.1 技术选型

- **CSS Custom Properties**：所有配色、字号、间距定义为 CSS 变量，定义在 `:root`
- **Google Fonts**：引入 Inter（400/500/600/700）+ 可选的 JetBrains Mono
- **Vue `<Transition>`**：用于路由切换动画
- **Scoped CSS**：保持现有模式，全局变量在 `main.css`

### 7.2 文件变更范围

| 文件 | 变更 |
|------|------|
| `index.html` | 添加 Google Fonts `<link>` |
| `src/assets/styles/main.css` | 新增 `:root` 变量、全局重置、字体引入 |
| `src/App.vue` | 全局样式迁移到 CSS 变量 |
| `src/components/NavBar.vue` | 微调高度、颜色、滚动效果 |
| `src/components/HeroSection.vue` | 头像光晕、入场动画、按钮分层 |
| `src/components/ProjectCard.vue` | 底色、圆角、hover 动效、badge 颜色 |
| `src/components/TechTag.vue` | 金色配色 |
| `src/components/ImageGallery.vue` | 选中态金色、过渡动画 |
| `src/components/ProjectGrid.vue` | 间距微调 |
| `src/views/ProjectDetail.vue` | Back 链接金色、按钮分层、Markdown 内容样式 |

### 7.3 实施顺序

1. **CSS 变量基础设施** — `main.css` + `index.html` 字体引入
2. **全局样式迁移** — `App.vue` 适配 CSS 变量
3. **组件逐个升级** — NavBar → Hero → Card → Tag → Gallery → Detail
4. **动效叠加** — 在组件升级后逐层添加
5. **响应式验证** — 移动端/平板检查
6. **视觉走查** — 与设计文档对比确认

---

## 8. 成功标准

- [ ] 所有硬编码颜色替换为 CSS 变量
- [ ] Inter 字体正确加载和渲染
- [ ] 组件在 640px / 768px 断点下正确响应
- [ ] 路由切换有平滑过渡
- [ ] 卡片 hover 有视觉反馈
- [ ] 无视觉闪烁或布局偏移（CLS）
- [ ] 与 GitHub Dark 风格有明显的视觉区分
- [ ] 构建通过，无 regressions

# Commit & Push Workflow

## 本地检查（推送前必做）

```powershell
# 一条命令跑完构建 + 测试
npm run check
```

等价于 CI 做的事：`npm run build` → `npm test`，两步全部通过才能 push。

| 步骤 | 命令 | 检查内容 |
|------|------|----------|
| 构建 | `npm run build` | 编译无报错、dist/ 生成正确 |
| 测试 | `npm test` | 9 个测试文件、27 个测试全部通过 |

## 常规开发流程

```
修改代码 → npm test → git add → git commit → git push
```

每次提交前至少跑 `npm test`，功能开发完成跑 `npm run check`。

## Commit Message 规范

```
<type>: <简短描述>

- 具体改动点 1
- 具体改动点 2
```

常用 type：

| Type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修 bug |
| `refactor` | 重构，不改功能 |
| `test` | 测试相关 |
| `docs` | 文档 |
| `chore` | 构建、依赖等杂项 |

## CI 做了什么

推送 `master` 分支后，GitHub Actions 自动执行：

1. `npm ci` — 按 lock 文件干净安装依赖
2. `npm run build` — 构建
3. `npm test` — 跑测试
4. 部署到 GitHub Pages

三步全过才会部署。

## 常见失败原因

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| 测试失败 | 改了组件但没更新测试 | 本地 `npm test` 定位 |
| 构建失败 | import 路径错误、缺失文件 | `npm run build` 看报错 |
| CI 失败但本地通过 | 依赖版本差异 | 用 `npm ci` 模拟 CI 安装 |

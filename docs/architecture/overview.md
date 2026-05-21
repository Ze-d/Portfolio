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

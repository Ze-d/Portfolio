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

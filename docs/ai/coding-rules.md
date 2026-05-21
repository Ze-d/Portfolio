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

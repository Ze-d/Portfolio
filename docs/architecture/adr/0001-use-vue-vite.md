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

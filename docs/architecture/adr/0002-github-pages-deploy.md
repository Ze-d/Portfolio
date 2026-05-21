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

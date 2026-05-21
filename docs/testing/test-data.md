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

# Testing Strategy

## Layers

| Layer | Tool | What it tests |
|-------|------|---------------|
| Unit | Vitest + @vue/test-utils | Individual components render correctly with given props |
| Integration | Vitest + vue-router | Route resolution, navigation between views |
| E2E | Not in v1 | Full browser testing (Playwright candidate) |

## Principles

1. **TDD always** — write the test first, watch it fail, then implement
2. **Test behavior, not implementation** — assert what the user sees, not internal state
3. **One assertion per test case** — makes failures immediately clear
4. **Use fixtures** — `tests/fixtures/` provides sample data, tests never import from `src/data/`

## Running Tests

```bash
npm test              # single run
npm run test:watch    # watch mode
```

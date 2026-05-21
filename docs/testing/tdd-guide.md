# TDD Guide

## Cycle

1. **Red** — Write a failing test that describes the desired behavior
2. **Green** — Write the minimal code to make the test pass
3. **Refactor** — Clean up while tests stay green
4. **Commit** — One commit per component/feature

## Example

```bash
# 1. Write test in tests/unit/MyComponent.spec.js
# 2. Run and see it fail
npx vitest run tests/unit/MyComponent.spec.js
# 3. Implement MyComponent.vue
# 4. Run and see it pass
npx vitest run tests/unit/MyComponent.spec.js
# 5. Commit
git add src/components/MyComponent.vue tests/unit/MyComponent.spec.js
git commit -m "feat: add MyComponent"
```

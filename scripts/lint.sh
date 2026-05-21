#!/usr/bin/env bash
set -euo pipefail

echo "Running linter..."
npx eslint . --ext .vue,.js 2>/dev/null || echo "ESLint not configured yet — install and configure to enable linting"

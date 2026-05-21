#!/usr/bin/env bash
set -euo pipefail

echo "Building..."
npm run build

echo "Running tests..."
npm test

echo "Build complete. Deploy via: git push origin main"
echo "Or set up GitHub Actions for automatic deployment."

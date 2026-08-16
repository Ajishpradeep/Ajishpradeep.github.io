#!/usr/bin/env bash
# Dev-only: bundle scripts/render-resume.tsx and render the resume PDF to a file.
#
# Node cannot run TSX directly, so esbuild (already a Vite dependency) bundles
# it first with node_modules left external. Usage:
#   ./scripts/render-resume.sh /path/to/out.pdf
set -euo pipefail

OUT="${1:?usage: render-resume.sh <output.pdf>}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Inside the project: node_modules are left external, so the bundle has to sit
# somewhere Node's resolver can still walk up to them.
TMP="$ROOT/node_modules/.cache/resume-render"
mkdir -p "$TMP"

npx esbuild "$ROOT/scripts/render-resume.tsx" \
  --bundle --platform=node --format=esm --packages=external \
  --jsx=automatic --loader:.tsx=tsx \
  --outfile="$TMP/render.mjs" --log-level=warning

node "$TMP/render.mjs" "$OUT"

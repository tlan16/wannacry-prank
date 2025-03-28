#!/usr/bin/env bash
cd "$(dirname "$0")/.." || exit 1
set -euro pipefail

npx --yes tailwindcss-cli build -o ./css/tailwind.css

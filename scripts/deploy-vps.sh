#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/web-portfolio}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-yourin-nuxt}"
NUXT_PUBLIC_SITE_URL="${NUXT_PUBLIC_SITE_URL:-https://yourin.my.id}"

cd "$APP_DIR"

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$current_branch" != "$BRANCH" ]]; then
  echo "Refusing deploy: current branch is '$current_branch', expected '$BRANCH'."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing deploy: working tree is dirty."
  git status --short
  exit 1
fi

git fetch origin "$BRANCH"
git pull --ff-only origin "$BRANCH"

export NODE_ENV=production
export NUXT_PUBLIC_SITE_URL

npm ci
npm run build

if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "$PM2_APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --only "$PM2_APP_NAME" --update-env
fi

pm2 save

curl --fail --silent --show-error --retry 10 --retry-delay 2 http://127.0.0.1:3000/ >/dev/null
echo "Deploy complete for '$PM2_APP_NAME'."
#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/web-portfolio}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-yourin-nuxt}"
NUXT_PUBLIC_SITE_URL="${NUXT_PUBLIC_SITE_URL:-https://yourin.my.id}"
LOG_FILE="${LOG_FILE:-/tmp/web-portfolio-deploy.log}"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "[$(date -Iseconds)] Starting deploy for '$PM2_APP_NAME' in '$APP_DIR'"

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

echo "[$(date -Iseconds)] Fetching latest branch '$BRANCH'"
git fetch origin "$BRANCH"
echo "[$(date -Iseconds)] Pulling latest branch '$BRANCH'"
git pull --ff-only origin "$BRANCH"

export NODE_ENV=production
export NUXT_PUBLIC_SITE_URL

echo "[$(date -Iseconds)] Running npm ci"
npm ci
echo "[$(date -Iseconds)] Running npm run build"
npm run build

echo "[$(date -Iseconds)] Reloading PM2 app '$PM2_APP_NAME'"
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "$PM2_APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --only "$PM2_APP_NAME" --update-env
fi

pm2 save

echo "[$(date -Iseconds)] Running local health check"
curl --fail --silent --show-error --retry 10 --retry-delay 2 http://127.0.0.1:3000/ >/dev/null
echo "Deploy complete for '$PM2_APP_NAME'."
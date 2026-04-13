# Portfolio Deployment

This repository deploys to the production VPS through GitHub Actions.

## Flow

1. Push to `main`.
2. GitHub Actions runs `npm ci` and `npm run build`.
3. If the build passes, GitHub Actions connects to the VPS over SSH.
4. The VPS runs `scripts/deploy-vps.sh`.
5. The script pulls the latest `main`, rebuilds the app, and reloads PM2.

## Required GitHub Secrets

- `VPS_HOST`: production server hostname or IP.
- `VPS_PORT`: SSH port.
- `VPS_USER`: SSH user used for deploy.
- `VPS_SSH_PRIVATE_KEY`: private key for the deploy user.
- `VPS_KNOWN_HOSTS`: output of `ssh-keyscan -H <host>`.

## Server Assumptions

- Repository path: `/var/www/web-portfolio`
- Branch: `main`
- PM2 app name: `yourin-nuxt`
- Node.js 20 is installed on the server.
- PM2 is installed and already manages the app.

## Safety Checks

- Deploy fails if the VPS checkout is on the wrong branch.
- Deploy fails if the VPS working tree is dirty.
- Deploy uses `git pull --ff-only` to avoid silent merges on the server.
- Deploy finishes with a local health check against `http://127.0.0.1:3000/`.

## First-Time Setup

1. Add the required GitHub Secrets.
2. Make sure the deploy user can access `/var/www/web-portfolio` and run `pm2`.
3. Commit and push this workflow and script to GitHub.
4. Run the workflow manually once with `workflow_dispatch` if needed.

## Notes

- Do not edit production files directly on the VPS.
- If the server checkout becomes dirty, deployment will stop until the drift is fixed.
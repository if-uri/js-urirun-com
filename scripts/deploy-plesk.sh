#!/usr/bin/env bash
# Publish js.urirun.com (the urirun event tracker served at /urirun.js).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="${URIRUN_DEPLOY_HOST:-urirun@urirun.com}"
DOCROOT="${URIRUN_JS_DOCROOT:-/var/www/vhosts/urirun.com/js.urirun.com}"
echo "== deploy js.urirun.com -> ${REMOTE}:${DOCROOT} =="
rsync -az --delete \
  --exclude '.git' --exclude 'scripts' --exclude 'Makefile' \
  --exclude '.github' --exclude '*.md' --exclude 'CNAME' \
  --exclude 'node_modules' --exclude 'package.json' --exclude 'src' \
  "${ROOT}/" "${REMOTE}:${DOCROOT}/"
ssh "${REMOTE}" "cd '${DOCROOT}' && find . -type d -exec chmod 755 {} + && find . -type f -exec chmod 644 {} +"
# The served asset must be reachable for the tracker to load on other sites.
curl -fsSI "https://js.urirun.com/urirun.js" | head -3 || true
echo done

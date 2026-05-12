#!/bin/bash
# Deploy script for howitsfilmed.com — GitHub Pages
# Safe to run as many times as you want from Terminal.

set -e

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
USERNAME="brianwhitesel"
REPO="howitsfilmed.com"
KEYCHAIN_SERVICE="workspace-github-token"

# ── Pull token from macOS Keychain ────────────────────────────────────────────
TOKEN=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -w 2>/dev/null)
if [ -z "$TOKEN" ]; then
  echo "❌  No GitHub token found in Keychain under '$KEYCHAIN_SERVICE'."
  echo "    To store one, run:"
  echo "    security add-generic-password -s 'workspace-github-token' -a '$USERNAME' -w 'YOUR_GITHUB_TOKEN_HERE'"
  exit 1
fi

cd "$DEPLOY_DIR"

# ── Initialize git repo only if one doesn't exist yet ────────────────────────
if [ ! -d ".git" ]; then
  echo "📦  No git repo found — initializing..."
  git init
  git branch -M main
else
  echo "📂  Existing git repo detected — skipping init."
fi

# ── Configure git identity ────────────────────────────────────────────────────
git config user.name "$USERNAME"
git config user.email "brianwhitesel@gmail.com"

# ── Set remote (rebuilds it each time so the token stays fresh) ───────────────
git remote remove origin 2>/dev/null || true
git remote add origin "https://${USERNAME}:${TOKEN}@github.com/$USERNAME/$REPO.git"

# ── Stage everything ──────────────────────────────────────────────────────────
git add -A

# ── Commit only if something actually changed ─────────────────────────────────
if git diff --cached --quiet; then
  echo "ℹ️   Nothing new to commit — all files are already up to date on GitHub."
else
  TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
  git commit -m "Update — $TIMESTAMP"
  echo "✅  Changes committed."
fi

# ── Push (--force handles any diverged history from prior git-init runs) ──────
echo "🚀  Pushing to GitHub..."
git push --force -u origin main

echo ""
echo "✅  Done! Your site will refresh at howitsfilmed.com within ~1–2 minutes."
echo "    To check deploy status: https://github.com/$USERNAME/$REPO/actions"

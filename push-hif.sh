#!/bin/bash
# push-hif.sh — one-command deploy for How It's Filmed app
# Usage: ./push-hif.sh "optional commit message"
# If no message given, uses a timestamped default.

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

MSG="${1:-"Update HIF app — $(date '+%b %d %Y %I:%M%p')"}"

echo "📁 Repo: $REPO_DIR"

# ── Kill any lingering git processes touching this repo ──────────────
pkill -f "git.*$(basename "$REPO_DIR")" 2>/dev/null
sleep 0.3

# ── Clear stale lock files ───────────────────────────────────────────
for LOCK in \
  ".git/index.lock" \
  ".git/HEAD.lock" \
  ".git/refs/heads/main.lock" \
  ".git/COMMIT_EDITMSG.lock"; do
  if [ -f "$LOCK" ]; then
    echo "🗑  Removing stale lock: $LOCK"
    rm -f "$LOCK"
  fi
done

# ── Stage, commit, push ──────────────────────────────────────────────
echo "📦 Staging all changes..."
git add -A

# Check if there's anything to commit
if git diff --cached --quiet; then
  echo "✅ Nothing new to commit — already up to date."
else
  echo "💬 Committing: $MSG"
  git commit -m "$MSG"
fi

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done. Cloudflare will deploy in ~60 seconds."

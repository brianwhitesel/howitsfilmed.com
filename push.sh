#!/bin/bash
# One-time deploy script for howitsfilmed.com GitHub Pages
# Run AFTER creating the repo at github.com/brianwhitesel/howitsfilmed.com

set -e

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
USERNAME="brianwhitesel"
REPO="howitsfilmed.com"

echo "📦 Initializing repo..."
cd "$DEPLOY_DIR"
git init
git add -A
git commit -m "Initial deploy — howitsfilmed.com"
git branch -M main
git remote add origin "https://github.com/$USERNAME/$REPO.git"
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main
echo ""
echo "✅ Done! Now:"
echo "   1. Go to github.com/$USERNAME/$REPO/settings/pages"
echo "   2. Set Source: Deploy from branch → main → / (root)"
echo "   3. Save — GitHub Pages will enable howitsfilmed.com in ~2 mins"

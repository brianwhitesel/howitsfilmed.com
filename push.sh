#!/bin/bash
# One-time deploy script for howitsfilmed.com GitHub Pages
# Run AFTER creating the repo at github.com/brianwhitesel/howitsfilmed.com

set -e

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
USERNAME="brianwhitesel"
REPO="howitsfilmed.com"
KEYCHAIN_SERVICE="workspace-github-token"

# Pull token from Keychain (same one used by push-to-site.sh)
TOKEN=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -w 2>/dev/null)
if [ -z "$TOKEN" ]; then
  echo "❌ No GitHub token found in Keychain."
  echo "   Run: bash ~/Desktop/Brian\ Personal/Automations/push-to-site.sh --store-token"
  exit 1
fi

echo "📦 Initializing repo..."
cd "$DEPLOY_DIR"
git init
git add -A
git commit -m "Initial deploy — howitsfilmed.com"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "https://${USERNAME}:${TOKEN}@github.com/$USERNAME/$REPO.git"
git config user.name "$USERNAME"
git config user.email "brianwhitesel@gmail.com"
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main
echo ""
echo "✅ Done! Now:"
echo "   1. Go to github.com/$USERNAME/$REPO/settings/pages"
echo "   2. Set Source: Deploy from branch → main → / (root)"
echo "   3. Save — GitHub Pages will enable howitsfilmed.com in ~2 mins"

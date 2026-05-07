#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# update-docs.sh — Auto-detect source changes, regenerate docs
# ============================================================
# This script lives in the 09-docs project root.
# Source repos: 00-Ghost-5.116.2, 01-jibunsee-react
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$DOCS_DIR"

GHOST_DIR="/home/aidabo/work/legacy/00-Ghost-5.116.2"
JIBUNSEE_DIR="/home/aidabo/work/legacy/01-jibunsee-react"

LAST_UPDATE_FILE="$DOCS_DIR/docs/scripts/last-update.md"

# New doc directories
docs_dirs="$DOCS_DIR/docs"
backend_docs="$docs_dirs/backend"
frontend_docs="$docs_dirs/frontend"

# Temp files for change tracking
CHANGED_GHOST=$(mktemp)
CHANGED_JIBUNSEE=$(mktemp)
SUMMARY_FILE=$(mktemp)

# Cleanup on exit
trap 'rm -f "$CHANGED_GHOST" "$CHANGED_JIBUNSEE" "$SUMMARY_FILE"' EXIT

# Default: relative to last commit unless GIT_REF is set
GIT_REF="${GIT_REF:-HEAD~1}"

# ---------- Helper: get git diff for a repo ----------
get_diff() {
    local repo_dir="$1"
    local ref="$2"
    shift 2
    local paths=("$@")

    if [ ! -d "$repo_dir/.git" ]; then
        echo "WARNING: $repo_dir is not a git repository, skipping." >&2
        return 0
    fi

    # Try the ref; fall back to comparing against nothing (first commit) or empty tree
    if git -C "$repo_dir" rev-parse --verify "$ref" >/dev/null 2>&1; then
        git -C "$repo_dir" diff --name-only "$ref" -- "${paths[@]}" 2>/dev/null || true
    else
        # If ref doesn't exist (e.g., shallow clone), show all tracked files
        git -C "$repo_dir" ls-files -- "${paths[@]}" 2>/dev/null || true
    fi
}

# ---------- Analyze Ghost changes ----------
get_diff "$GHOST_DIR" "$GIT_REF" \
    "ghost/core/core/server/api/endpoints/social-*.js" \
    "ghost/core/core/server/api/endpoints/utils/social-*.js" \
    "ghost/core/core/server/models/social-*.js" \
    "ghost/core/core/server/services/social-*/" \
    "ghost/core/core/server/web/api/endpoints/admin/custom-routes.js" \
    "ghost/core/core/server/web/api/endpoints/content/custom-routes.js" \
    "ghost/core/core/server/data/schema/schema.js" \
    "ghost/core/core/server/data/migrations/versions/5.115/*social*" \
    "ghost/core/core/server/data/migrations/versions/5.116/*social*" \
> "$CHANGED_GHOST" 2>/dev/null || true

# ---------- Analyze Jibunsee changes ----------
get_diff "$JIBUNSEE_DIR" "$GIT_REF" \
    "apps/host/src/**/*.ts" \
    "apps/host/src/**/*.tsx" \
    "apps/qwen-rt-proxy/src/**/*.js" \
    "packages/**/*.{ts,tsx}" \
    "apps/host/next.config.js" \
    "apps/host/.docker/*" \
> "$CHANGED_JIBUNSEE" 2>/dev/null || true

# ---------- Check if anything changed ----------
HAS_CHANGES=false
CHANGES_DETECTED=""

if [ -s "$CHANGED_GHOST" ]; then
    HAS_CHANGES=true
    COUNT=$(wc -l < "$CHANGED_GHOST")
    CHANGES_DETECTED="$CHANGES_DETECTED
  🐻 Ghost: $COUNT file(s) changed"
    while IFS= read -r line; do
        CHANGES_DETECTED="$CHANGES_DETECTED
    - $line"
    done < "$CHANGED_GHOST"
fi

if [ -s "$CHANGED_JIBUNSEE" ]; then
    HAS_CHANGES=true
    COUNT=$(wc -l < "$CHANGED_JIBUNSEE")
    CHANGES_DETECTED="$CHANGES_DETECTED
  ⚛️ Jibunsee-React: $COUNT file(s) changed"
    while IFS= read -r line; do
        CHANGES_DETECTED="$CHANGES_DETECTED
    - $line"
    done < "$CHANGED_JIBUNSEE"
fi

if [ "$HAS_CHANGES" = false ]; then
    # No changes — exit silently
    exit 0
fi

# ---------- Write last-update.md ----------
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S %Z')
echo "# Last Documentation Update" > "$LAST_UPDATE_FILE"
echo "" >> "$LAST_UPDATE_FILE"
echo "**Updated:** $TIMESTAMP" >> "$LAST_UPDATE_FILE"
echo "**Git ref:** $GIT_REF" >> "$LAST_UPDATE_FILE"
echo "" >> "$LAST_UPDATE_FILE"
echo "## Changes Detected" >> "$LAST_UPDATE_FILE"
echo "" >> "$LAST_UPDATE_FILE"
echo "$CHANGES_DETECTED" >> "$LAST_UPDATE_FILE"
echo "" >> "$LAST_UPDATE_FILE"

# ---------- Rebuild docs ----------
echo "" >> "$LAST_UPDATE_FILE"
echo "## Rebuild" >> "$LAST_UPDATE_FILE"
echo "" >> "$LAST_UPDATE_FILE"
cd "$PROJECT_ROOT"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "- Installing dependencies..." | tee -a "$LAST_UPDATE_FILE"
    yarn install 2>&1 >> "$LAST_UPDATE_FILE"
fi

echo "- Rebuilding VitePress site..." | tee -a "$LAST_UPDATE_FILE"
BUILD_OUTPUT=$(yarn docs:build 2>&1) && BUILD_OK=true || BUILD_OK=false
echo "$BUILD_OUTPUT" >> "$LAST_UPDATE_FILE"

if [ "$BUILD_OK" = true ]; then
    echo "- ✅ Build successful" >> "$LAST_UPDATE_FILE"
    BUILD_STATUS="✅ Build successful"
else
    echo "- ❌ Build failed" >> "$LAST_UPDATE_FILE"
    BUILD_STATUS="❌ Build failed"
fi

# ---------- Output change summary (for Discord/Cron) ----------
echo ""
echo "CHANGES:"
echo "$(date '+%Y-%m-%d %H:%M:%S') — Documentation updated"
echo "$CHANGES_DETECTED"
echo "  $BUILD_STATUS"
echo ""

# Also write to stdout summary
echo "CHANGES:" > "$SUMMARY_FILE"
echo "$(date '+%Y-%m-%d %H:%M:%S') — Documentation updated" >> "$SUMMARY_FILE"
echo "$CHANGES_DETECTED" >> "$SUMMARY_FILE"
echo "  $BUILD_STATUS" >> "$SUMMARY_FILE"

cat "$SUMMARY_FILE"

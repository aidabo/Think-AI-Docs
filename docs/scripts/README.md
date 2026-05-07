# Auto-Update Mechanism

The documentation site can be automatically updated when source code changes are detected in the upstream projects.

## Script

[`update-docs.sh`](../../scripts/update-docs.sh) is the main update script. It:

1. Checks for changes in both source repositories using `git diff`
2. Extracts the list of changed files
3. If changes are relevant, regenerates the documentation markdown
4. Rebuilds the VitePress site
5. Writes `last-update.md` with a change summary
6. Outputs a "CHANGES:" summary to stdout (suitable for Discord notifications)

## Usage

```bash
# Direct execution
bash scripts/update-docs.sh

# Via npm script
npm run docs:update
```

## Change Detection Scope

### Backend (00-Ghost-5.116.2)
- `ghost/core/core/server/api/endpoints/social-*.js` — Social API controllers
- `ghost/core/core/server/api/endpoints/utils/social-*.js` — Social utilities
- `ghost/core/core/server/models/social-*.js` — Social models
- `ghost/core/core/server/services/social-*/` — Social services
- `ghost/core/core/server/web/api/endpoints/admin/custom-routes.js` — Admin routes
- `ghost/core/core/server/web/api/endpoints/content/custom-routes.js` — Public routes
- `ghost/core/core/server/data/schema/schema.js` — DB schema
- `ghost/core/core/server/data/migrations/versions/5.115/*social*` — Social migrations
- `ghost/core/core/server/data/migrations/versions/5.116/*social*` — More social migrations

### Frontend (01-jibunsee-react)
- `apps/host/src/**/*.ts` — TypeScript source
- `apps/host/src/**/*.tsx` — React components
- `apps/qwen-rt-proxy/src/**/*.js` — RT proxy
- `packages/**/*.{ts,tsx}` — Shared packages
- `apps/host/next.config.js` — Configuration
- `apps/host/.docker/*` — Build files

## Output Format

```
CHANGES:
2026-04-29 00:00:00 JST — Documentation updated

  🐻 Ghost: 3 file(s) changed
    - ghost/core/core/server/api/endpoints/social-ai-chats.js
    - ghost/core/core/server/models/social-ai-conversations.js
    - ghost/core/core/server/services/social-comments/CommentsController.js

  ⚛️ Jibunsee-React: 1 file(s) changed
    - apps/host/src/services/ghost/postQuery.ts

  ✅ Build successful
```

If no changes are detected, the script exits silently (exit code 0).

## CI Integration

See [CI Integration Proposal](./ci-proposal.md) for setup options:
- **Cron job** (simple) — periodic execution with Discord webhook notification
- **GitHub Actions** — CI integration with GitHub Pages deployment
- **Discord Bot** — on-demand refresh via chat command
- **OpenClaw Cron** — platform-native scheduled task

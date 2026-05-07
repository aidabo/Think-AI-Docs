# CI Integration Proposal

## Option 1: Cron Job (Simple)

Run `update-docs.sh` periodically via system cron:

```bash
# Run every hour, send output to Discord webhook
0 * * * * cd /home/aidabo/work/legacy/09-docs && \
  output=$(bash docs/scripts/update-docs.sh 2>&1) && \
  [ -n "$output" ] && \
  curl -X POST -H "Content-Type: application/json" \
    -d "{\"content\":\"$output\"}" \
    "$DISCORD_WEBHOOK_URL"
```

### Cron Setup Steps

1. Place the update script: `scripts/update-docs.sh`
2. Create a wrapper script that captures output and sends to Discord:

```bash
#!/bin/bash
# /home/aidabo/work/legacy/scripts/docs-watch.sh
DISCORD_WEBHOOK_URL="${DISCORD_WEBHOOK_URL:-}"  # Set in environment
OUTPUT=$(cd /home/aidabo/work/legacy/09-docs && bash docs/scripts/update-docs.sh 2>&1)
if [ -n "$OUTPUT" ]; then
    echo "$OUTPUT"
    if [ -n "$DISCORD_WEBHOOK_URL" ]; then
        PAYLOAD=$(echo "$OUTPUT" | jq -Rs '{content: .}' | jq -c .)
        curl -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$DISCORD_WEBHOOK_URL"
    fi
fi
```

3. Add to crontab:

```bash
crontab -e
# Add:
0 * * * * /home/aidabo/work/legacy/scripts/docs-watch.sh >> /home/aidabo/work/legacy/logs/docs-watch.log 2>&1
```

## Option 2: GitHub Actions (Recommended)

For repos on GitHub, use a workflow that rebuilds when source code changes:

```yaml
# .github/workflows/docs-update.yml
name: Update Documentation
on:
  push:
    branches: [main, develop]
    paths:
      - 'ghost/core/core/server/**'
      - 'apps/host/src/**'
      - 'packages/**'
  schedule:
    - cron: '0 * * * *'  # Also run hourly

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for git diff
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Build Documentation
        run: |
          cd 09-docs
          npm ci
          bash docs/scripts/update-docs.sh
          
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./09-docs/docs/.vitepress/dist
          
      - name: Send Discord Notification
        if: ${{ env.CHANGES != '' }}
        env:
          DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
        run: |
          echo "$CHANGES" | while IFS= read -r line; do
            curl -X POST -H "Content-Type: application/json" \
              -d "{\"content\":\"$line\"}" \
              "$DISCORD_WEBHOOK"
          done
```

## Option 3: Discord Bot Listener

Add a Discord bot command to trigger a docs rebuild on demand:

```
/docs update  →  "Rebuilding documentation..."
              →  "✅ Docs rebuilt successfully!"
              →  (posts change summary)
```

This requires a Discord bot that can run the script and return output.

## Option 4: OpenClaw Cron Task

Since this environment uses OpenClaw, register a cron task:

```bash
# Using OpenClaw's cron mechanism
# Task: Run docs update check every hour
# Command: cd /home/aidabo/work/legacy/09-docs && bash docs/scripts/update-docs.sh
# Notify: Send output to Discord channel
```

## Recommended Setup

For the current workflow:

1. **Primary:** System cron job (Option 1) — simple, no external dependencies
2. **Future:** GitHub Actions (Option 2) — when repos are pushed to GitHub
3. **On-demand:** Discord bot (Option 3) — for manual refresh requests

The update script is designed to be **idempotent** — it only outputs when there are actual changes, so frequent cron runs are harmless.

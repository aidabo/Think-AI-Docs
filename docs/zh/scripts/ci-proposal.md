# CI 集成方案

## 方案 1：Cron 任务（简单）

通过系统 cron 定时运行 `update-docs.sh`：

```bash
# 每小时运行一次，输出发送到 Discord webhook
0 * * * * cd /home/aidabo/work/legacy/09-docs && \
  output=$(bash docs/scripts/update-docs.sh 2>&1) && \
  [ -n "$output" ] && \
  curl -X POST -H "Content-Type: application/json" \
    -d "{\"content\":\"$output\"}" \
    "$DISCORD_WEBHOOK_URL"
```

### Cron 设置步骤

1. 放置更新脚本：`scripts/update-docs.sh`
2. 创建捕获输出并发送到 Discord 的包装脚本：

```bash
#!/bin/bash
# /home/aidabo/work/legacy/scripts/docs-watch.sh
DISCORD_WEBHOOK_URL="${DISCORD_WEBHOOK_URL:-}"  # 在环境中设置
OUTPUT=$(cd /home/aidabo/work/legacy/09-docs && bash docs/scripts/update-docs.sh 2>&1)
if [ -n "$OUTPUT" ]; then
    echo "$OUTPUT"
    if [ -n "$DISCORD_WEBHOOK_URL" ]; then
        PAYLOAD=$(echo "$OUTPUT" | jq -Rs '{content: .}' | jq -c .)
        curl -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$DISCORD_WEBHOOK_URL"
    fi
fi
```

3. 添加到 crontab：

```bash
crontab -e
# 添加：
0 * * * * /home/aidabo/work/legacy/scripts/docs-watch.sh >> /home/aidabo/work/legacy/logs/docs-watch.log 2>&1
```

## 方案 2：GitHub Actions（推荐）

对于 GitHub 上的仓库，使用在源代码变更时重新构建的工作流：

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
    - cron: '0 * * * *'  # 也定时每小时运行

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 需要完整历史记录以进行 git diff
          
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

## 方案 3：Discord Bot 监听器

添加 Discord Bot 命令以按需触发文档重建：

```
/docs update  →  "正在重建文档..."
              →  "✅ 文档重建成功！"
              →  (发布变更摘要)
```

这需要一个能够运行脚本并返回输出的 Discord Bot。

## 方案 4：OpenClaw Cron 任务

由于此环境使用 OpenClaw，注册一个 cron 任务：

```bash
# 使用 OpenClaw 的 cron 机制
# 任务：每小时运行文档更新检查
# 命令：cd /home/aidabo/work/legacy/09-docs && bash docs/scripts/update-docs.sh
# 通知：将输出发送到 Discord 频道
```

## 推荐设置

对于当前工作流：

1. **主要：** 系统 cron 任务（方案 1）— 简单，无外部依赖
2. **未来：** GitHub Actions（方案 2）— 当仓库推送到 GitHub 时
3. **按需：** Discord Bot（方案 3）— 用于手动刷新请求

该更新脚本设计为**幂等的**——仅在存在实际变更时输出，因此频繁的 cron 执行是无害的。

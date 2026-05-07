# 自动更新机制

当检测到上游项目源代码发生变化时，文档站点可以自动更新。

## 脚本文件

[`update-docs.sh`](../../scripts/update-docs.sh) 是主要的更新脚本。它执行以下操作：

1. 使用 `git diff` 检查两个源码仓库的变化
2. 提取变更文件列表
3. 如果检测到相关变更，则重新生成文档 Markdown
4. 重新构建 VitePress 站点
5. 编写 `last-update.md` 文件，包含变更摘要
6. 输出 "CHANGES:" 摘要到标准输出（适用于 Discord 通知）

## 使用方法

```bash
# 直接执行
bash scripts/update-docs.sh

# 通过 npm 脚本
npm run docs:update
```

## 变更检测范围

### 后端 (00-Ghost-5.116.2)
- `ghost/core/core/server/api/endpoints/social-*.js` — Social API 控制器
- `ghost/core/core/server/api/endpoints/utils/social-*.js` — Social 工具函数
- `ghost/core/core/server/models/social-*.js` — Social 模型
- `ghost/core/core/server/services/social-*/` — Social 服务
- `ghost/core/core/server/web/api/endpoints/admin/custom-routes.js` — 管理端路由
- `ghost/core/core/server/web/api/endpoints/content/custom-routes.js` — 公开端路由
- `ghost/core/core/server/data/schema/schema.js` — 数据库模式
- `ghost/core/core/server/data/migrations/versions/5.115/*social*` — Social 迁移
- `ghost/core/core/server/data/migrations/versions/5.116/*social*` — 更多 Social 迁移

### 前端 (01-jibunsee-react)
- `apps/host/src/**/*.ts` — TypeScript 源码
- `apps/host/src/**/*.tsx` — React 组件
- `apps/qwen-rt-proxy/src/**/*.js` — RT 代理
- `packages/**/*.{ts,tsx}` — 共享包
- `apps/host/next.config.js` — 配置文件
- `apps/host/.docker/*` — 构建文件

## 输出格式

```
CHANGES:
2026-04-29 00:00:00 JST — 文档已更新

  🐻 Ghost: 3 个文件变更
    - ghost/core/core/server/api/endpoints/social-ai-chats.js
    - ghost/core/core/server/models/social-ai-conversations.js
    - ghost/core/core/server/services/social-comments/CommentsController.js

  ⚛️ Jibunsee-React: 1 个文件变更
    - apps/host/src/services/ghost/postQuery.ts

  ✅ 构建成功
```

如果未检测到变更，脚本静默退出（退出代码 0）。

## CI 集成

参见 [CI 集成方案](./ci-proposal.md) 了解配置选项：
- **Cron 任务**（简单）— 定时执行，通过 Discord webhook 通知
- **GitHub Actions** — CI 集成，结合 GitHub Pages 部署
- **Discord Bot** — 通过聊天命令按需刷新
- **OpenClaw Cron** — 平台原生定时任务

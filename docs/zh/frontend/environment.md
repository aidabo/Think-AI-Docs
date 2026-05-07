# 环境配置

## 环境文件策略

项目支持通过 `.env` 文件管理多个部署环境：

| 文件 | 环境 |
|------|-------------|
| `.env.local` | 本地开发（非 Docker） |
| `.env.development` | 预发布/开发部署 |
| `.env.production` | 生产部署 |

## 关键变量

### 后端连接

```bash
GHOST_CONTENT_API_KEY=...         # 内容 API 密钥，用于公开数据
GHOST_ADMIN_API_KEY=...           # 管理 API 密钥，用于认证操作
GHOST_ADMIN_API_URL=http://localhost:2368  # Ghost 后端 URL
GHOST_FRONT_URL=http://localhost:3000      # 本应用的 URL
```

### AI 提供商密钥

```bash
OPENAI_API_KEY=sk-...             # OpenAI (GPT-4, etc.)
GEMINI_API_KEY=AIza...            # Google Gemini
DEEPSEEK_API_KEY=sk-...           # DeepSeek
GLM_API_KEY=...                   # GLM (Zhipu)
QWEN_API_KEY=sk-...               # Alibaba Qwen (realtime)
QWEN_API_KEY_CHAT=sk-...          # Qwen（仅聊天密钥）
DASHSCOPE_API_KEY=sk-...          # DashScope
DASHSCOPE_API_KEY_CHAT=sk-...     # DashScope（仅聊天密钥）
```

### 内部配置

```bash
# Docker 内部服务间 API 调用的内部基础 URL
# （如果未设置，默认使用 GHOST_ADMIN_API_URL）
AI_INTERNAL_BASE_URL=http://127.0.0.1:3000

# 详细 AI 服务端日志
AI_SERVER_LOG=1
```

### UI 配置

```bash
NEXT_PUBLIC_GHOST_USE_VIDEO_JS=true  # 使用 Video.js 播放器
NEXT_PUBLIC_FRONT_URL=http://localhost:3000
```

## Next.js 配置

文件：`apps/host/next.config.js`

| 选项 | 值 | 用途 |
|--------|-------|---------|
| `output` | `"standalone"` | 自包含 Node.js 服务器，用于 Docker |
| `trailingSlash` | `true` | URL 规范化 |
| `compiler.emotion` | `true` | CSS-in-JS 支持 |
| `swcMinify` | `true` | 基于 SWC 的代码压缩 |
| `experimental.serverActions.logRequests` | `true` | 调试 API 路由 |

### 图片远程模式

允许的图片来源（CSP）：

- `localhost:2368`（本地 Ghost 图片）
- `dnicugzydez8x.cloudfront.net`（CDN）
- `static.ghost.org`（Ghost 静态资源）

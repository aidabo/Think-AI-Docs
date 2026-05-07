# Environment Configuration

## Environment File Strategy

The project supports multiple deployment environments using `.env` files:

| File | Environment |
|------|-------------|
| `.env.local` | Local development (non-Docker) |
| `.env.development` | Staging/development deployment |
| `.env.production` | Production deployment |

## Key Variables

### Backend Connection

```bash
GHOST_CONTENT_API_KEY=...         # Content API key for public data
GHOST_ADMIN_API_KEY=...           # Admin API key for authenticated operations
GHOST_ADMIN_API_URL=http://localhost:2368  # Ghost backend URL
GHOST_FRONT_URL=http://localhost:3000      # This app's URL
```

### AI Provider Keys

```bash
OPENAI_API_KEY=sk-...             # OpenAI (GPT-4, etc.)
GEMINI_API_KEY=AIza...            # Google Gemini
DEEPSEEK_API_KEY=sk-...           # DeepSeek
GLM_API_KEY=...                   # GLM (Zhipu)
QWEN_API_KEY=sk-...               # Alibaba Qwen (realtime)
QWEN_API_KEY_CHAT=sk-...          # Qwen (chat-only key)
DASHSCOPE_API_KEY=sk-...          # DashScope
DASHSCOPE_API_KEY_CHAT=sk-...     # DashScope (chat-only)
```

### Internal Configuration

```bash
# Internal base URL for Docker inter-service API calls
# (defaults to GHOST_ADMIN_API_URL if not set)
AI_INTERNAL_BASE_URL=http://127.0.0.1:3000

# Verbose AI server logging
AI_SERVER_LOG=1
```

### UI Configuration

```bash
NEXT_PUBLIC_GHOST_USE_VIDEO_JS=true  # Use Video.js player
NEXT_PUBLIC_FRONT_URL=http://localhost:3000
```

## Next.js Configuration

File: `apps/host/next.config.js`

| Option | Value | Purpose |
|--------|-------|---------|
| `output` | `"standalone"` | Self-contained Node.js server for Docker |
| `trailingSlash` | `true` | URL normalization |
| `compiler.emotion` | `true` | CSS-in-JS support |
| `swcMinify` | `true` | SWC-based minification |
| `experimental.serverActions.logRequests` | `true` | Debug API routes |

### Image Remote Patterns

Allowed image sources (CSP):

- `localhost:2368` (local Ghost images)
- `dnicugzydez8x.cloudfront.net` (CDN)
- `static.ghost.org` (Ghost static assets)

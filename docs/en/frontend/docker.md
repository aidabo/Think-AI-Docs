# Docker & Deployment

## Docker Images

| Image | Dockerfile | Purpose |
|-------|-----------|---------|
| `ghost-front:1.0.5-next` | `apps/host/.docker/prd.next.Dockerfile` | Main Next.js frontend |
| `ghost-media-runner:1.0.5-next` | `apps/host/.docker/prd.runner.Dockerfile` | Background media processing worker |
| `qwen-rt-proxy:0.0.1` | `apps/qwen-rt-proxy/Dockerfile` | AI streaming proxy |

## Building

```bash
# Build frontend
cd apps/host
yarn docker:host:build

# Build media job runner
yarn docker:runner:build

# Build Qwen proxy
yarn workspace @ghost-next/qwen-rt-proxy docker:build
```

## Docker Network

The frontend and Ghost backend communicate over a shared Docker network:

```bash
# Create once
docker network create ghost-network
```

Docker Compose configuration:

```yaml
networks:
  my-shared-network:
    external: true
```

Both the frontend and backend services must be on the same network:

```yaml
services:
  frontend:
    networks:
      - my-shared-network
  ghost:
    networks:
      - my-shared-network
```

## Production Deployment

### Prerequisites
1. AWS credentials configured in the deployment environment
2. API keys set in `.env.production`

### Steps

```bash
# 1. Build Docker image (standalone output)
yarn docker:next:build

# 2. Deploy script — builds image, pushes to S3
./deploy.sh

# 3. On EC2 instance — pulls image, builds container, starts
./deploy-on-ec2.sh
```

## Media Job Worker

A background worker that processes AI media jobs:

```bash
cd apps/host
yarn start:worker
# → scripts/run-media-job-worker.sh
```

## Qwen RT Proxy

A lightweight WebSocket-based real-time AI streaming proxy:

```bash
# Development
yarn workspace @ghost-next/qwen-rt-proxy dev

# Production
yarn workspace @ghost-next/qwen-rt-proxy start
```

## Local Development

```bash
# Host app (Next.js dev server on port 3000)
cd apps/host
yarn dev

# Qwen proxy (WebSocket on port 3001)
cd apps/qwen-rt-proxy
yarn dev

# Ghost backend (port 2368)
cd /home/aidabo/work/legacy/00-Ghost-5.116.2
yarn dev
```

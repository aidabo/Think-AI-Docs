# Docker 与部署

## Docker 镜像

| 镜像 | Dockerfile | 用途 |
|-------|-----------|---------|
| `ghost-front:1.0.5-next` | `apps/host/.docker/prd.next.Dockerfile` | 主 Next.js 前端 |
| `ghost-media-runner:1.0.5-next` | `apps/host/.docker/prd.runner.Dockerfile` | 后台媒体处理工作者 |
| `qwen-rt-proxy:0.0.1` | `apps/qwen-rt-proxy/Dockerfile` | AI 流式代理 |

## 构建

```bash
# 构建前端
cd apps/host
yarn docker:host:build

# 构建媒体任务运行器
yarn docker:runner:build

# 构建 Qwen 代理
yarn workspace @ghost-next/qwen-rt-proxy docker:build
```

## Docker 网络

前端和 Ghost 后端通过共享的 Docker 网络通信：

```bash
# 创建一次
docker network create ghost-network
```

Docker Compose 配置：

```yaml
networks:
  my-shared-network:
    external: true
```

前端和后端服务必须在同一网络上：

```yaml
services:
  frontend:
    networks:
      - my-shared-network
  ghost:
    networks:
      - my-shared-network
```

## 生产部署

### 前置条件
1. 在部署环境中配置 AWS 凭证
2. 在 `.env.production` 中设置 API 密钥

### 步骤

```bash
# 1. 构建 Docker 镜像（standalone 输出）
yarn docker:next:build

# 2. 部署脚本——构建镜像，推送到 S3
./deploy.sh

# 3. 在 EC2 实例上——拉取镜像，构建容器，启动
./deploy-on-ec2.sh
```

## 媒体任务工作者

处理 AI 媒体任务的后台工作者：

```bash
cd apps/host
yarn start:worker
# → scripts/run-media-job-worker.sh
```

## Qwen RT Proxy

一个轻量级的基于 WebSocket 的实时 AI 流式代理：

```bash
# 开发环境
yarn workspace @ghost-next/qwen-rt-proxy dev

# 生产环境
yarn workspace @ghost-next/qwen-rt-proxy start
```

## 本地开发

```bash
# 宿主应用（Next.js 开发服务器，端口 3000）
cd apps/host
yarn dev

# Qwen 代理（WebSocket，端口 3001）
cd apps/qwen-rt-proxy
yarn dev

# Ghost 后端（端口 2368）
cd /home/aidabo/work/legacy/00-Ghost-5.116.2
yarn dev
```

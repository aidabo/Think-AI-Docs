# Docker 部署（后端）

## 生产构建

```bash
# 构建生产镜像（基于 Alpine）
docker build . -f .docker/prd.Dockerfile -t ghost:5.116.2-alpine-next-r5 --no-cache
```

## 开发

```bash
# 运行完整栈
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose up --attach=ghost --force-recreate --no-log-prefix

# 交互式 Shell
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose run --rm -it ghost

# 构建镜像
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose build
```

## 归档分发

```bash
yarn archive
```

> **注意：** 如果在 `ghost/core/build:assets` 遇到并行构建权限错误，请设置 `nx.json` 的 `"parallel": 1`。

## 数据库

```bash
yarn knex-migrator    # 运行模式迁移
yarn setup            # 完全设置：子模块 + 构建 + 数据库初始化
```

## 重置

```bash
yarn reset:data                           # 10万会员、500篇文章
yarn reset:data:empty                     # 空数据库
yarn reset:data:xxl                       # 200万会员（压力测试）
```

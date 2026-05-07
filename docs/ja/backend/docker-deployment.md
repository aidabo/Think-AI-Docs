# Docker Deployment (Backend)

## Production Build

```bash
# Build production image (Alpine-based)
docker build . -f .docker/prd.Dockerfile -t ghost:5.116.2-alpine-next-r5 --no-cache
```

## Development

```bash
# Run full stack
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose up --attach=ghost --force-recreate --no-log-prefix

# Interactive shell
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose run --rm -it ghost

# Build images
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose build
```

## Archiving for Distribution

```bash
yarn archive
```

> **Note:** Set `nx.json` `"parallel": 1` if you encounter parallel build permission errors on `ghost/core/build:assets`.

## Database

```bash
yarn knex-migrator    # Run schema migrations
yarn setup            # Full setup: submodules + build + DB init
```

## Reset

```bash
# Reset database with sample data
yarn reset:data                           # 100k members, 500 posts
yarn reset:data:empty                    # Empty database
yarn reset:data:xxl                      # 2M members (stress test)
```

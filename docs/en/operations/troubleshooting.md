# Troubleshooting

## Common Issues

### Deployment & Startup

| Issue | Cause | Solution |
|-------|-------|----------|
| `docker compose up` fails | Port conflict | Check with `docker ps`, stop conflicting service |
| MySQL connection error | Container startup order | Restart: `docker compose restart ghost` |
| 403 Forbidden | API key not set | Check `API_KEY` in `.env` |
| 502 Bad Gateway | Container not running | `docker compose ps` to check status |

### AI Features

| Issue | Cause | Solution |
|-------|-------|----------|
| No AI response | Invalid API key | Check AI settings in admin panel |
| No voice output | Mic permission | Check browser mic permissions |
| Image generation fails | Provider rate limit | Check DALL-E rate limits |
| Streaming interrupted | Network | Verify WebSocket connection |

### Performance

| Issue | Cause | Solution |
|-------|-------|----------|
| Slow page load | Cache miss | Check SWR cache settings |
| Slow AI response | Provider latency | Switch model in admin panel |
| Slow image upload | S3 region mismatch | Use same region as server |

## Contact Support

When reporting issues, include:

```yaml
Issue summary: 
Time occurred: 
Environment: 
  - OS: 
  - Browser: 
  - Think-AI version: 
Error message: 
Steps to reproduce: 
  1. 
  2. 
  3. 
```

## Checking Logs

```bash
# Backend logs
docker compose logs ghost

# Frontend logs
docker compose logs nextjs

# DB logs
docker compose logs mysql

# Media worker logs
docker compose logs media-worker
```

## Health Check

```bash
# Container status
docker compose ps

# Resource usage
docker stats

# API health
curl http://localhost:2368/ghost/api/admin/health

# Disk usage
df -h
```

---

[Back to Operations →](index)

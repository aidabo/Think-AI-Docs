# 故障排除

## 常见问题

### 部署与启动

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `docker compose up` 失败 | 端口冲突 | 使用 `docker ps` 检查 |
| MySQL 连接错误 | 容器启动顺序 | `docker compose restart ghost` |
| 403 禁止访问 | API 密钥未设置 | 检查 `.env` 中的 `API_KEY` |
| 502 错误 | 容器未运行 | `docker compose ps` 检查状态 |

### AI 功能

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| AI 无响应 | API 密钥无效 | 检查管理后台 AI 设置 |
| 听不到语音 | 麦克风权限 | 检查浏览器麦克风权限 |
| 图像生成失败 | 提供商限流 | 检查 DALL-E 速率限制 |

### 性能

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 页面加载慢 | 缓存未命中 | 检查 SWR 缓存设置 |
| AI 响应慢 | 提供商延迟 | 切换模型 |
| 图片上传慢 | S3 区域不匹配 | 使用与服务器相同区域 |

## 查看日志

```bash
# 后端日志
docker compose logs ghost

# 前端日志
docker compose logs nextjs

# 数据库日志
docker compose logs mysql
```

## 健康检查

```bash
# 容器状态
docker compose ps

# 资源使用
docker stats

# API 健康检查
curl http://localhost:2368/ghost/api/admin/health
```

---

[返回运维首页 →](index)

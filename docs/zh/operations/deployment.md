# 部署指南

## 前提条件

| 要求 | 版本/规格 |
|------|----------|
| Docker | 24.0+ |
| Docker Compose | 2.20+ |
| MySQL | 8.0（容器内置） |
| Node.js | 20.19.0（生产环境使用容器） |
| 推荐服务器 | 4 vCPU / 8GB RAM 以上 |

## 部署步骤

### 1. 克隆仓库

```bash
# 后端
git clone <repo-url> 00-Ghost-5.116.2

# 前端
git clone <repo-url> 01-jibunsee-react
```

### 2. 配置环境变量

```bash
cd 00-Ghost-5.116.2
cp .env.example .env
# 编辑 .env 配置
```

**主要环境变量：**

| 变量 | 说明 | 必需 |
|------|------|------|
| `database__connection__host` | MySQL 主机 | ✅ |
| `database__connection__user` | MySQL 用户 | ✅ |
| `database__connection__password` | MySQL 密码 | ✅ |
| `database__connection__database` | 数据库名 | ✅ |
| `url` | 站点 URL | ✅ |
| `OPENAI_API_KEY` | OpenAI API 密钥 | 🔶 使用 AI 时 |
| `GEMINI_API_KEY` | Google Gemini API 密钥 | 🔶 使用 AI 时 |
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | 🔶 使用 AI 时 |
| `QWEN_API_KEY` | Alibaba Qwen API 密钥 | 🔶 使用 AI 时 |
| `ZHIPU_API_KEY` | Zhipu GLM API 密钥 | 🔶 使用 AI 时 |

### 3. 使用 Docker Compose 启动

```bash
# 后端
cd 00-Ghost-5.116.2
docker compose up -d

# 前端
cd 01-jibunsee-react
docker compose up -d
```

### 4. 验证

```bash
# 后端 API
curl http://localhost:2368/ghost/api/admin/

# 前端
curl http://localhost:3000
```

---

[返回运维首页 →](index)

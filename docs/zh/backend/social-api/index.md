# 自定义 Social API

核心后端扩展：在 `/social/` 路径前缀下的 **30+ 自定义 API 端点**。

## 架构概览

```
客户端
  │
  ├── 管理 API (ghost/api/admin/)
  │   └── 自定义路由 (/social/*)
  │       ├── 社交图谱（书签、关注、点赞、转发）
  │       ├── 群组（群组、成员）
  │       ├── 评论（CRUD、点赞、举报、回复）
  │       ├── 组件（内容块、文章绑定）
  │       ├── 图库（S3 预签名上传）
  │       ├── AI（聊天、提醒、媒体任务、智能体设置）
  │       └── 日志（用户活动审计）
  │
  └── 内容 API (ghost/api/content/)
      └── 自定义路由 (/social/comments/*, /social/components/*)
```

## 端点注册方式

```
                  endpoints/index.js
                  │
                  │  get social<Name>() + pipeline()
                  │
                  ▼
             控制器文件
          social-<name>.js
                  │
                  ▼
          custom-routes.js
    router.get('/social/<name>', middleware, handler)
                  │
                  ▼
             Express 路由器
                  │
                  ▼
           HTTP 客户端请求
```

## 关键文件

| 文件 | 用途 |
|------|---------|
| `api/endpoints/index.js` | 端点注册表（`// custom begin` / `// custom end`） |
| `api/endpoints/social-*.js` | 各个控制器文件 |
| `api/endpoints/utils/social-media-assets.js` | 共享媒体工具 |
| `web/api/endpoints/admin/custom-routes.js` | 管理端路由定义 |
| `web/api/endpoints/content/custom-routes.js` | 公开端路由定义 |
| `web/api/endpoints/admin/middleware.js` | 认证中间件 + API 密钥允许列表 |

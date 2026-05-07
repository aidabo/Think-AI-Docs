# 页面路由与导航

基于 Next.js 14 App Router 构建——基于文件系统的路由，支持 SSR、SSG 和客户端导航。

## 路由表

| URL 模式 | 页面 | 渲染方式 | 导航上下文 |
|-------------|------|-----------|-------------------|
| `/` | 着陆页 | SSR | 着陆页 |
| `/home` | 用户首页动态 | SSR | 已认证 |
| `/article/:slug` | 文章 | SSR/SSG | 公开 */ |
| `/group-article/:id` | 群组文章 | SSR | 群组范围 |
| `/author/:slug` | 作者页 | SSR | 公开 |
| `/tag/:slug` | 标签列表 | SSR | 公开 |
| `/gallery` | 图库 | SSR | 用户图库 |
| `/stories` | 故事动态 | SSR | SNS 故事 |
| `/editor` | 内容编辑器 | SSR | 已认证 |
| `/editor/:slug` | 编辑文章 | SSR | 已认证 |
| `/dashboard` | 仪表盘 | SSR | 已认证 |
| `/profile` | 个人资料设置 | SSR | 已认证 |
| `/ai` | AI 聊天 | SSR | 已认证 |
| `/pages` | 页面构建器 | SSR (stackpage) | 已认证 |
| `/pages-public/:slug` | 公开页面 | SSR | 公开 |
| `/panel` | 管理面板 | SSR | 管理员 |
| `/viewer` | 内容查看器 | SSR | 已认证 |
| `/signup` | 注册 | SSR | 公开 |
| `/link/:id` | 链接重定向 | SSR | 公开 |
| `/reset` | 密码重置 | SSR | 公开 |
| `/dev` | 开发工具 | SSR | 开发环境 |

## Ghost API 代理（重写）

后端 Ghost API 通过重写代理，以避免 CORS 问题并集中配置：

```javascript
// next.config.js
async rewrites() {
    return [
        {
            source: "/ghost/api/:path*/",
            destination: `${process.env.GHOST_ADMIN_API_URL}/ghost/api/:path*/`,
        },
        {
            source: "/members/api/:path*/",
            destination: `${process.env.GHOST_ADMIN_API_URL}/members/api/:path*/`,
        },
    ];
}
```

## API 路由处理器

`src/app/api/` 包含 Next.js API 路由处理器，执行服务端逻辑：

| 处理器组 | 功能 |
|---------------|----------|
| `/api/posts/*` | 文章 CRUD 操作 |
| `/api/authors/*` | 作者数据 |
| `/api/tags/*` | 标签查询 |
| `/api/comments/*` | SNS 评论操作 |
| `/api/groups/*` | 社交群组操作 |
| `/api/pages/*` | 自定义页面管理 |
| `/api/pages-public/*` | 公开页面服务 |
| `/api/settings/*` | 设置 CRUD |
| `/api/storage/*` | S3/云文件操作 |
| `/api/eastate/*` | Eastate 业务逻辑 |
| `/api/ai/*` | AI 聊天与搜索 |
| `/api/internal/*` | 内部工具 |
| `/api/invites/*` | 用户邀请 |
| `/api/dev/*` | 开发端点 |

## 导航流程

```
公开                          已认证
  │                           │
  ├── /                       ├── /home
  ├── /article/:slug          ├── /dashboard
  ├── /author/:slug           ├── /profile
  ├── /tag/:slug              ├── /gallery
  ├── /signup                 ├── /editor
  └── /link/:id               ├── /ai
                              ├── /pages
                              └── /panel
```

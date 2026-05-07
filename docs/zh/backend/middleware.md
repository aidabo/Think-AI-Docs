# 中间件与认证

这是后端架构的关键部分 — 中间件链控制所有 `/social/*` 端点的访问并强制执行权限。

## authAdminApi 中间件链

文件：`ghost/core/core/server/web/api/endpoints/admin/middleware.js`

所有管理员自定义路由都经过此中间件数组：

```javascript
module.exports.authAdminApi = [
    auth.authenticate.authenticateAdminApi,    // JWT 或 Bearer 令牌验证
    auth.authorize.authorizeAdminApi,           // 角色/权限断言
    apiMw.updateUserLastSeen,                   // 跟踪用户在线状态
    apiMw.cors,                                  // 跨域头
    shared.middleware.urlRedirects.adminSSLAndHostRedirect,  // 强制 HTTPS
    shared.middleware.prettyUrls,               // URL 规范化
    notImplemented                              // API 密钥资源允许列表
];
```

## `notImplemented` 中间件

这是控制 API 密钥可以访问哪些资源的关键安全层：

```javascript
const notImplemented = (req, res, next) => {
    if (!req.api_key) return next();
    if (req.query.god_mode && process.env.NODE_ENV === 'development') return next();
    const allowlisted = {
        posts: ['GET', 'PUT', 'DELETE', 'POST'],
        pages: ['GET', 'PUT', 'DELETE', 'POST'],
        members: ['GET', 'PUT', 'DELETE', 'POST'],
        tags: ['GET', 'PUT', 'DELETE', 'POST'],
        users: ['GET'],
        settings: ['GET'],
        social: ['GET', 'POST', 'DELETE', 'PUT']  // 所有方法均允许
    };
    const match = req.url.match(/^\/(\w+)\/?/);
    if (match) {
        const entity = match[1];
        if (allowlisted[entity] && allowlisted[entity].includes(req.method)) {
            return next();
        }
    }
    next(new errors.InternalServerError({
        errorType: 'NotImplementedError',
        message: 'API 密钥访问未实现。',
        statusCode: 501
    }));
};
```

> **关键洞察:** `social` 实体的所有 HTTP 方法均在允许列表中，这意味着所有 `/social/*` 端点均可通过 API 密钥访问 — 与其他资源不同。

## 公开路由认证

公开（内容 API）路由使用更轻量的认证：

```javascript
// AuthenticatePublic — 验证会员令牌或允许匿名访问
// 不会阻止未认证请求，但如果存在令牌则会用会员信息丰富 req
```

## 权限对象

自定义社交端点通过数据库迁移注册权限对象：

| 权限对象 | 资源 |
|-------------------|----------|
| `socialbookmark` | 书签 |
| `socialforward` | 转发 |
| `socialfollow` | 关注 |
| `socialfavor` | 点赞 |
| `socialgroup` | 群组 |
| `socialgroupmember` | 群组成员 |
| `socialpostcomment` | 评论 |
| `socialpostcommentlike` | 评论点赞 |
| `socialpostcommentreport` | 评论举报 |
| `socialcomponent` | 组件 |
| `socialaidevice` | AI 设备 |
| `socialaismslog` | AI 短信日志 |
| `socialaiuserphone` | AI 用户电话 |
| `socialaiagentsetting` | AI 智能体设置 |

控制器通过在处理器定义中设置 `permissions: true` 来启用权限检查。

## 路由级与控制器级权限

- **路由中间件** (`authAdminApi`) — 确保已认证的会话/令牌
- **控制器权限** (`permissions: true`) — 检查对资源的基于角色的访问

## Docker 部署（后端）

### 生产构建
```bash
docker build . -f .docker/prd.Dockerfile -t ghost:5.116.2-alpine-next-r5 --no-cache
```

### 开发
```bash
COMPOSE_PROFILES=${COMPOSE_PROFILES:-ghost} docker compose up --attach=ghost --force-recreate --no-log-prefix
```

### 数据库
```bash
yarn knex-migrator    # 运行模式迁移
yarn setup            # 完全设置：子模块 + 构建 + 数据库初始化
```

### 重置
```bash
yarn reset:data                           # 10万会员、500篇文章
yarn reset:data:empty                     # 空数据库
```

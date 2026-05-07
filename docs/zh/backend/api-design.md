# API 设计模式

Ghost API 框架在所有端点上强制执行一致的模式。

## 控制器结构

每个端点文件导出一个带有标准 CRUD 处理程序的控制器对象：

```javascript
// 示例：social-follows.js
const controller = {
    docName: 'socialfollows',
    browse: {
        options: ['include', 'page', 'limit', 'fields', 'filter', 'order', 'debug'],
        validation: {
            options: {
                include: ['user', 'followedUser']
            }
        },
        permissions: true,
        query(frame) {
            return models.SocialFollow.findPage({
                ...frame.options,
                withRelated: ALLOWED_INCLUDES
            });
        }
    },
    read: { /* ... */ },
    add: { /* ... */ },
    edit: { /* ... */ },
    destroy: { /* ... */ }
};
```

## 请求/响应约定

### 响应格式
- **browse** → 返回带 `meta.pagination` 的资源列表（分页时）
- **read** → 单个资源（与 browse 项格式相同）
- 无自定义嵌套包装器 — 与 Ghost API 约定一致

### 请求格式
- **ID 路径参数** → 控制器中的 `options.id`
- **请求体负载** → `data.<docName>[0]`（数组包装对象）
- **查询字符串** → `frame.options.*`
- **包含关联** → `?include=user,followedUser`

## 端点注册流程

```
1. 创建端点文件
   ghost/core/core/server/api/endpoints/social-<name>.js
2. 在 index.js 中注册
   get social<Name>() {
       return apiFramework.pipeline(require('./social-<name>'), localUtils);
   }
3. 在 custom-routes.js 中创建路由
   router.get('/social/<name>', mw.authAdminApi, http(api.social<Name>.browse));
4. 创建 Bookshelf 模型
   ghost/core/core/server/models/social-<name>.js
5. 创建数据库迁移
   ghost/core/core/server/data/migrations/versions/5.116/
6. 如果是新表则更新模式
   ghost/core/core/server/data/schema/schema.js
```

## 自定义操作类型

某些端点超越 CRUD：

| 模式 | 示例 | 实现 |
|---------|---------|---------------|
| **嵌套操作** | `/social/comments/:id/like` | 控制器中的自定义处理程序名称 |
| **计数** | `/social/comments/counts/:ids` | 批量计数端点 |
| **状态** | `/social/comments/:id/status` | 状态转换 |
| **调度** | `/social/ai/reminders/dispatch` | 副作用触发 |
| **认领/进度** | `/social/ai/media/jobs/claim` | 工作进程协调 |
| **预签名** | `/social/gallery/presign` | S3 签名 URL 生成 |

## 错误处理

- 通过 `@tryghost/errors` 使用自定义错误
- 标准 HTTP 状态码
- 权限错误返回 403
- 未找到返回 404
- API 密钥限制返回 501（未实现）

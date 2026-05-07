# 自定义 Social API — 路由目录

所有路由定义在 `ghost/core/core/server/web/api/endpoints/` 中。

## 真相来源

- **管理端：** `admin/custom-routes.js` — 80+ 路由定义
- **公开端：** `content/custom-routes.js` — 公开评论/组件访问
- **注册表：** `api/endpoints/index.js`（`// custom begin` … `// custom end`）

## 管理端路由（需要 `authAdminApi` 中间件）

### 社交图谱

| 方法 | 路径 | 处理程序 | 文档名称 |
|--------|------|---------|----------|
| GET | `/social/bookmarks` | browse | `socialbookmarks` |
| GET | `/social/bookmarks/:id` | read | |
| POST | `/social/bookmarks` | add | |
| DELETE | `/social/bookmarks/:id` | destroy | |
| GET | `/social/forwards` | browse | `socialforwards` |
| GET | `/social/forwards/:id` | read | |
| POST | `/social/forwards` | add | |
| DELETE | `/social/forwards/:id` | destroy | |
| GET | `/social/follows` | browse | `socialfollows` |
| POST | `/social/follows` | add | |
| DELETE | `/social/follows/:id` | destroy | |
| GET | `/social/favors` | browse | `socialfavors` |
| POST | `/social/favors` | add | |
| DELETE | `/social/favors/:id` | destroy | |

### 群组

| 方法 | 路径 | 处理程序 | 说明 |
|--------|------|---------|-------|
| GET | `/social/groups` | browse | 分页群组列表 |
| GET | `/social/groups/:id` | read | 包含文章、成员、计数 |
| GET | `/social/groups_count` | count | 群组合计 |
| POST | `/social/groups` | add | 创建群组 |
| PUT | `/social/groups/:id` | edit | 更新群组详情 |
| DELETE | `/social/groups/:id` | destroy | 删除群组 |
| GET | `/social/members` | browse | 群组成员列表 |
| POST | `/social/members` | add | 邀请/加入群组 |
| PUT | `/social/members/:id` | edit | 更改角色 |
| DELETE | `/social/members/:id` | destroy | 移除成员 |

### 评论

| 方法 | 路径 | 处理程序 |
|--------|------|---------|
| GET | `/social/comments/post/:post_id` | browse |
| GET | `/social/comments/:id/replies` | replies |
| POST | `/social/comments/post` | add |
| PUT | `/social/comments/:id` | edit |
| POST | `/social/comments/:id/like` | like |
| POST | `/social/comments/:id/unlike` | unlike |
| POST | `/social/comments/:id/report` | report |
| GET | `/social/comments/counts/:ids` | counts |

### 组件

| 方法 | 路径 | 处理程序 |
|--------|------|---------|
| GET | `/social/components` | browse |
| POST | `/social/components` | add |
| PUT | `/social/components/:id` | edit |
| DELETE | `/social/components/:id` | destroy |

### 图库

| 方法 | 路径 | 处理程序 | 说明 |
|--------|------|---------|-------------|
| GET | `/social/gallery/user` | user | 用户图库 |
| GET | `/social/gallery/group` | group | 所有群组图库 |
| POST | `/social/gallery/presign` | presign | 获取 S3 预签名上传 URL |
| POST | `/social/gallery/finalize` | finalize | 确认上传完成 |

### AI 功能

**聊天：**
| 方法 | 路径 | 处理程序 |
|--------|------|---------|
| GET | `/social/ai/chats` | browse |
| POST | `/social/ai/chats` | add |
| DELETE | `/social/ai/chats/:id` | destroy |

**提醒：**
| 方法 | 路径 |
|--------|------|
| GET/POST | `/social/ai/reminders` |
| PUT | `/social/ai/reminders/:id` |
| GET | `/social/ai/reminders/dispatch` |

**媒体任务：**
| 方法 | 路径 | 处理程序 |
|--------|------|---------|
| POST | `/social/ai/media/jobs` | add |
| POST | `/social/ai/media/jobs/claim` | claim |
| POST | `/social/ai/media/jobs/:id/complete` | complete |
| POST | `/social/ai/media/jobs/:id/fail` | fail |
| POST | `/social/ai/media/jobs/:id/cancel` | cancel |
| POST | `/social/ai/media/jobs/:id/retry` | retry |

## 公开（内容 API）路由

### 评论（公开读取）
| 方法 | 路径 |
|--------|------|
| GET | `/social/comments/post/:post_id` |
| GET | `/social/comments/:id/replies/` |
| GET | `/social/comments/counts/:ids` |

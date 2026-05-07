# 后端服务

除了端点和模型之外，专用服务模块实现了复杂的业务逻辑。

## 社交评论服务

`ghost/core/core/server/services/social-comments/`

最核心的服务——处理完整的评论生命周期：

```
CommentsController.js          ← 业务逻辑编排器
├── browse(post_id)            ← 获取文章的评论列表（分页）
├── replies(comment_id)        ← 获取线程化回复
├── add(data)                  ← 创建评论（含内容门控）
├── read(id)                   ← 获取单条评论
├── edit(id, data)             ← 更新评论内容
├── like(id, user)             ← 点赞/取消点赞切换
├── unlike(id, user)           ← 移除点赞
├── report(id, user, reason)   ← 标记为不当内容
└── counts(ids)                ← 批量获取多篇文章的评论数

CommentsService.js             ← 领域逻辑
CommentsServiceEmails.js       ← 邮件通知
CommentsStatsService.js        ← 统计/分析
content-gating.js              ← 访问控制（公开/会员/付费）
```

**邮件模板：** `email-templates/`
- `new-comment.hbs` + `.txt.js`
- `new-comment-reply.hbs` + `.txt.js`
- `report.hbs` + `.txt.js`

**内容门控** 检查：
- 文章可见性（公开 / 仅会员 / 仅付费）
- 评论状态（已批准 / 待审核 / 隐藏）
- 用户角色和群组成员关系

## AI 媒体任务服务

`ghost/core/core/server/services/social-ai-media-jobs/`

基于工作者的后台处理管道：

```
             ┌──────────────────┐
             │   API 端点        │
             │  POST /add       │
             └────────┬─────────┘
                      │
                      ▼
              ┌──────────────┐
              │   PENDING    │（待处理）
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │   CLAIMED    │（已认领）← 工作者 POST /claim
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │ IN PROGRESS  │（处理中）← 工作者 POST /progress
              └──────┬───────┘
                    ┌─┴─┐
                    ▼   ▼
            ┌─────────┐ ┌──────────┐
            │COMPLETED│ │  FAILED  │  ← POST /complete 或 /fail
            └─────────┘ └────┬─────┘
                             │ POST /retry
                             ▼
                        ┌─────────┐
                        │ PENDING │
                        └─────────┘

POST /cancel 可在任何阶段触发 → CANCELLED（已取消）
```

**工作者** 是无状态的——它们认领可用任务、处理，并通过 API 报告结果。

**媒体资源工具：** `api/endpoints/utils/social-media-assets.js`——缩略图生成、S3 路径管理。

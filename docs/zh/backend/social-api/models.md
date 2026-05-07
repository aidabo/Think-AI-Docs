# 模型与数据库模式

所有社交功能都有专用的 Bookshelf 模型和数据库表，构建在 Ghost 核心模式之上。

## 表目录

### 社交图谱

| 表 | 模型 | 用途 | 关键列 |
|-------|-------|---------|-------------|
| `social_bookmarks` | `SocialBookmark` | 用户书签 | user_id, post_id, created_at |
| `social_follows` | `SocialFollow` | 用户间关注 | user_id, followed_user_id |
| `social_favors` | `SocialFavor` | 点赞/收藏操作 | user_id, post_id |
| `social_forwards` | `SocialForward` | 内容分享 | user_id, post_id, target |

### 群组

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_groups` | `SocialGroup` | 社区群组 |
| `social_groups_members` | `SocialGroupMember` | 成员关系，含角色（owner/admin/member/deactivated） |
| `social_group`（posts 表的列） | — | 群组范围的文章 |

### 评论

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_post_comments` | `SocialPostComment` | 评论（含 `parent_id` 实现线程化） |
| `social_post_comments_likes` | `SocialPostCommentLike` | 评论点赞 |
| `social_post_comments_reports` | `SocialPostCommentReport` | 评论举报 |

### 组件

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_components` | `SocialComponent` | 可复用的内容构建块 |
| `social_post_components` | `SocialPostComponent` | 组件到文章的绑定关系 |

### 媒体资源

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_media_assets` | `SocialMediaAsset` | 图库图片（S3 路径、缩略图、job_id） |

### 日志

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_user_logs` | `SocialUserLog` | 用户活动审计追踪 |

### AI 功能

| 表 | 模型 | 用途 |
|-------|-------|---------|
| `social_ai_conversations` | `SocialAiConversation` | AI 聊天会话 |
| `social_ai_messages` | `SocialAiMessage` | 聊天消息历史 |
| `social_ai_devices` | `SocialAiDevice` | 已注册的推送通知设备 |
| `social_ai_sms_logs` | `SocialAiSmsLog` | 短信投递记录 |
| `social_ai_usages` | `SocialAiUsage` | AI API 用量计量 |
| `social_ai_reminders` | `SocialAiReminder` | 用户设置的提醒 |
| `social_ai_reminder_events` | `SocialAiReminderEvent` | 提醒触发日志 |
| `social_ai_user_phones` | `SocialAiUserPhone` | 已验证的电话号码 |
| `social_ai_agent_settings` | `SocialAiAgentSetting` | AI 智能体配置 |
| `social_ai_media_jobs` | `SocialAiMediaJob` | 后台媒体处理任务 |

## 模式定义

文件：`ghost/core/core/server/data/schema/schema.js`

## 数据迁移

所有自定义表迁移：`ghost/core/core/server/data/migrations/versions/5.115/` 和 `5.116/`

**核心社交功能（5.115）：**
- 群组 + 角色 + 成员关系
- 关注、书签、收藏、转发
- 文章评论 + 点赞 + 举报
- 文章上的群组外键

**AI 与组件（5.116）：**
- 组件 + 文章-组件绑定
- 用户日志表
- 媒体资源（缩略图、任务跟踪）
- AI 聊天、设备、短信、提醒、电话、智能体设置、媒体任务

# Models & Database Schema

All social features have dedicated Bookshelf models and database tables, layered on top of Ghost's core schema.

## Table Catalog

### Social Graph

| Table | Model | Purpose | Key Columns |
|-------|-------|---------|-------------|
| `social_bookmarks` | `SocialBookmark` | User bookmarks | user_id, post_id, created_at |
| `social_follows` | `SocialFollow` | User-to-user follows | user_id, followed_user_id |
| `social_favors` | `SocialFavor` | Like/favor actions | user_id, post_id |
| `social_forwards` | `SocialForward` | Content sharing | user_id, post_id, target |

### Groups

| Table | Model | Purpose |
|-------|-------|---------|
| `social_groups` | `SocialGroup` | Community groups |
| `social_groups_members` | `SocialGroupMember` | Membership with roles (owner/admin/member/deactivated) |
| `social_group` (column on `posts`) | — | Group-scoped posts |

### Comments

| Table | Model | Purpose |
|-------|-------|---------|
| `social_post_comments` | `SocialPostComment` | Comments (with `parent_id` for threading) |
| `social_post_comments_likes` | `SocialPostCommentLike` | Comment likes |
| `social_post_comments_reports` | `SocialPostCommentReport` | Comment reports |

### Components

| Table | Model | Purpose |
|-------|-------|---------|
| `social_components` | `SocialComponent` | Reusable content building blocks |
| `social_post_components` | `SocialPostComponent` | Component-to-post bindings |

### Media Assets

| Table | Model | Purpose |
|-------|-------|---------|
| `social_media_assets` | `SocialMediaAsset` | Gallery images (S3 path, thumbnail, job_id) |

### Logs

| Table | Model | Purpose |
|-------|-------|---------|
| `social_user_logs` | `SocialUserLog` | User activity audit trail |

### AI Features

| Table | Model | Purpose |
|-------|-------|---------|
| `social_ai_conversations` | `SocialAiConversation` | AI chat sessions |
| `social_ai_messages` | `SocialAiMessage` | Chat message history |
| `social_ai_devices` | `SocialAiDevice` | Registered push notification devices |
| `social_ai_sms_logs` | `SocialAiSmsLog` | SMS delivery records |
| `social_ai_usages` | `SocialAiUsage` | AI API usage metering |
| `social_ai_reminders` | `SocialAiReminder` | User-configured reminders |
| `social_ai_reminder_events` | `SocialAiReminderEvent` | Reminder trigger log |
| `social_ai_user_phones` | `SocialAiUserPhone` | Verified phone numbers |
| `social_ai_agent_settings` | `SocialAiAgentSetting` | AI agent configuration |
| `social_ai_media_jobs` | `SocialAiMediaJob` | Background media processing |

## Schema Definition

File: `ghost/core/core/server/data/schema/schema.js`

## Migrations

All custom table migrations: `ghost/core/core/server/data/migrations/versions/5.115/` and `5.116/`

**Core social features (5.115):**
- Groups + roles + memberships
- Follows, bookmarks, favors, forwards
- Post comments + likes + reports
- Group FK on posts

**AI & components (5.116):**
- Components + post-component bindings
- User log table
- Media assets (thumbnails, job tracking)
- AI chat, devices, SMS, reminders, phones, agent settings, media jobs

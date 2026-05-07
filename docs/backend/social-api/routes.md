# Custom Social API — Route Catalog

All routes defined in `ghost/core/core/server/web/api/endpoints/`.

## Source of Truth

- **Admin:** `admin/custom-routes.js` — 80+ route definitions
- **Public:** `content/custom-routes.js` — public comment/component access
- **Registry:** `api/endpoints/index.js` (`// custom begin` … `// custom end`)

## Admin Routes (require `authAdminApi` middleware)

### Social Graph

| Method | Path | Handler | Doc Name |
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
| GET | `/social/follows/:id` | read | |
| POST | `/social/follows` | add | |
| DELETE | `/social/follows/:id` | destroy | |
| GET | `/social/favors` | browse | `socialfavors` |
| GET | `/social/favors/:id` | read | |
| POST | `/social/favors` | add | |
| DELETE | `/social/favors/:id` | destroy | |

### Groups

| Method | Path | Handler | Notes |
|--------|------|---------|-------|
| GET | `/social/groups` | browse | Paginated group list |
| GET | `/social/groups/:id` | read | Includes posts, members, counts |
| GET | `/social/groups_count` | count | Group count aggregate |
| POST | `/social/groups` | add | Create group |
| PUT | `/social/groups/:id` | edit | Update group details |
| DELETE | `/social/groups/:id` | destroy | Delete group |
| GET | `/social/members` | browse | Group members list |
| GET | `/social/members/:id` | read | Single member info |
| POST | `/social/members` | add | Invite/join group |
| PUT | `/social/members/:id` | edit | Change role (owner/admin only) |
| DELETE | `/social/members/:id` | destroy | Remove member |

**Group member roles:** `owner`, `admin`, `member`, `deactivated`

### Comments

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/comments/post/:post_id` | browse |
| GET | `/social/comments/:id/replies` | replies |
| POST | `/social/comments/post` | add |
| GET | `/social/comments/:id` | read |
| PUT | `/social/comments/:id` | edit |
| POST | `/social/comments/:id/like` | like |
| POST | `/social/comments/:id/unlike` | unlike |
| POST | `/social/comments/:id/report` | report |
| GET | `/social/comments/counts/:ids` | counts |

**Moderation only:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/comments/status/:post_id` | browse (reported comments) |
| PUT | `/social/comments/:id/status` | edit (approve/hide) |
| GET | `/social/comments/:id/new-replies` | browse (replies feed) |

### Components

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/components` | browse |
| GET | `/social/components/:id` | read |
| POST | `/social/components` | add |
| PUT | `/social/components/:id` | edit |
| DELETE | `/social/components/:id` | destroy |
| GET | `/social/postcomponents` | browse |
| GET | `/social/postcomponents/:id` | read |
| POST | `/social/postcomponents` | add |
| PUT | `/social/postcomponents/:id` | edit |
| DELETE | `/social/postcomponents/:id` | destroy |

### Gallery

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| GET | `/social/gallery/user` | user | User's gallery |
| GET | `/social/gallery/group` | group | All group galleries |
| GET | `/social/gallery/group/:id` | group | Specific group gallery |
| POST | `/social/gallery/presign` | presign | Get S3 presigned upload URL |
| POST | `/social/gallery/finalize` | finalize | Confirm upload complete |
| POST | `/social/gallery/sync-tags` | syncTags | Sync image tags |

### User Logs

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/userlogs` | browse |
| GET | `/social/userlogs/:id` | read |
| POST | `/social/userlogs` | add |
| PUT | `/social/userlogs/:id` | edit |
| DELETE | `/social/userlogs/:id` | destroy |

### AI Features

**Chats:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/chats` | browse |
| GET | `/social/ai/chats/:id` | read |
| POST | `/social/ai/chats` | add |
| DELETE | `/social/ai/chats/:id` | destroy |

**Devices & SMS:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/devices` | browse |
| POST | `/social/ai/devices` | add |
| PUT | `/social/ai/devices/:id` | edit |
| DELETE | `/social/ai/devices/:id` | destroy |
| GET | `/social/ai/sms-logs` | browse |
| POST | `/social/ai/sms-logs` | add |

**Usage:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/usages` | browse |
| GET | `/social/ai/usages/:id` | read |

**Reminders:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/reminders` | browse |
| GET | `/social/ai/reminders/:id` | read |
| POST | `/social/ai/reminders` | add |
| PUT | `/social/ai/reminders/:id` | edit |
| GET | `/social/ai/reminder-events` | browse |
| POST | `/social/ai/reminder-events` | add |
| GET | `/social/ai/reminders/dispatch` | browse (trigger dispatch) |

**Phones & Agent Settings:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/user-phones` | browse |
| POST | `/social/ai/user-phones` | add |
| PUT | `/social/ai/user-phones` | edit |
| GET | `/social/ai/agent-settings` | browse |
| GET | `/social/ai/agent-settings/:id` | read |
| POST | `/social/ai/agent-settings` | add |
| PUT | `/social/ai/agent-settings/:id` | edit |

**Media Jobs:**

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/ai/media/jobs` | browse |
| GET | `/social/ai/media/jobs/:id` | read |
| POST | `/social/ai/media/jobs` | add |
| PUT | `/social/ai/media/jobs/:id` | edit |
| POST | `/social/ai/media/jobs/:id/cancel` | cancel |
| POST | `/social/ai/media/jobs/:id/retry` | retry |
| POST | `/social/ai/media/jobs/claim` | claim |
| POST | `/social/ai/media/jobs/:id/progress` | progress |
| POST | `/social/ai/media/jobs/:id/complete` | complete |
| POST | `/social/ai/media/jobs/:id/fail` | fail |

## Public (Content API) Routes

### Comments (public read)

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/comments/post/:post_id` | browse |
| GET | `/social/comments/:id/replies/` | replies |
| GET | `/social/comments/:id` | read |
| GET | `/social/comments/counts/:ids` | counts |

### Components (public read)

| Method | Path | Handler |
|--------|------|---------|
| GET | `/social/components` | browse |
| GET | `/social/components/:id` | read |

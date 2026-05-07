# Backend Services

Beyond endpoints and models, dedicated service modules implement complex business logic.

## Social Comments Service

`ghost/core/core/server/services/social-comments/`

The most substantial service — handles the full comment lifecycle:

```
CommentsController.js          ← Business logic orchestrator
├── browse(post_id)            ← Get paginated comments for a post
├── replies(comment_id)        ← Get threaded replies
├── add(data)                  ← Create comment (with content gating)
├── read(id)                   ← Get single comment
├── edit(id, data)             ← Update comment body
├── like(id, user)             ← Like/unlike toggle
├── unlike(id, user)           ← Remove like
├── report(id, user, reason)   ← Flag as inappropriate
└── counts(ids)                ← Batch count for multiple posts

CommentsService.js             ← Domain logic
CommentsServiceEmails.js       ← Email notifications
CommentsStatsService.js        ← Statistics/analytics
content-gating.js              ← Access control (public/members/paid)
```

**Email templates:** `email-templates/`
- `new-comment.hbs` + `.txt.js`
- `new-comment-reply.hbs` + `.txt.js`
- `report.hbs` + `.txt.js`

**Content gating** checks:
- Post visibility (public / members-only / paid-only)
- Comment status (approved / pending / hidden)
- User roles and group membership

## AI Media Jobs Service

`ghost/core/core/server/services/social-ai-media-jobs/`

Worker-based background processing pipeline:

```
             ┌──────────────────┐
             │  API Endpoint    │
             │  POST /add       │
             └────────┬─────────┘
                      │
                      ▼
              ┌──────────────┐
              │   PENDING    │
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │   CLAIMED    │  ← Worker POST /claim
              └──────┬───────┘
                     │
              ┌──────▼───────┐
              │ IN PROGRESS  │  ← Worker POST /progress
              └──────┬───────┘
                    ┌─┴─┐
                    ▼   ▼
            ┌─────────┐ ┌──────────┐
            │COMPLETED│ │  FAILED  │  ← POST /complete or /fail
            └─────────┘ └────┬─────┘
                             │ POST /retry
                             ▼
                        ┌─────────┐
                        │ PENDING │
                        └─────────┘

POST /cancel at any stage → CANCELLED
```

**Workers** are stateless — they claim available jobs, process, and report results back through the API.

**Media Assets Utility:** `api/endpoints/utils/social-media-assets.js` — thumbnail generation, S3 path management.

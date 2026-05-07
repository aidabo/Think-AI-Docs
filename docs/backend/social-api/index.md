# Custom Social API

The core backend extension: **30+ custom API endpoints** under the `/social/` path prefix.

## Architecture Overview

```
Client
  │
  ├── Admin API (ghost/api/admin/)
  │   └── Custom routes (/social/*)
  │       ├── Social Graph (bookmarks, follows, favors, forwards)
  │       ├── Groups (groups, members)
  │       ├── Comments (CRUD, likes, reports, replies)
  │       ├── Components (content blocks, post bindings)
  │       ├── Gallery (S3 presigned uploads)
  │       ├── AI (chats, reminders, media jobs, agent settings)
  │       └── Logs (user activity audit)
  │
  └── Content API (ghost/api/content/)
      └── Custom routes (/social/comments/*, /social/components/*)
```

## How Endpoints Are Registered

```
                  endpoints/index.js
                  │
                  │  get social<Name>() + pipeline()
                  │
                  ▼
             Controller file
          social-<name>.js
                  │
                  ▼
          custom-routes.js
    router.get('/social/<name>', middleware, handler)
                  │
                  ▼
              Express Router
                  │
                  ▼
           HTTP Client Request
```

## Key Files

| File | Purpose |
|------|---------|
| `api/endpoints/index.js` | Endpoint registry (`// custom begin` / `// custom end`) |
| `api/endpoints/social-*.js` | Individual controller files |
| `api/endpoints/utils/social-media-assets.js` | Shared media utilities |
| `web/api/endpoints/admin/custom-routes.js` | Admin route definitions |
| `web/api/endpoints/content/custom-routes.js` | Public route definitions |
| `web/api/endpoints/admin/middleware.js` | Auth middleware + API key allowlist |

[Full Route Catalog →](/backend/social-api/routes)  
[Models & Schema →](/backend/social-api/models)  
[Services →](/backend/social-api/services)  
[AI Features →](/backend/social-api/ai-features)

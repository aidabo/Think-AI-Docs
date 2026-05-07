# API Design Patterns

The Ghost API framework enforces consistent patterns across all endpoints.

## Controller Structure

Every endpoint file exports a controller object with standard CRUD handlers:

```javascript
// Example: social-follows.js
const controller = {
    docName: 'socialfollows',       // Root key in request/response body

    browse: {
        options: ['include', 'page', 'limit', 'fields', 'filter', 'order', 'debug'],
        validation: {
            options: {
                include: ['user', 'followedUser']  // Allowed relation includes
            }
        },
        permissions: true,           // Use Ghost permission system
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

## Request/Response Conventions

### Response shape
- **browse** → returns resource list with `meta.pagination` when paginated
- **read** → single resource (same shape as one browse item)
- No custom nested wrappers — consistent with Ghost API conventions

### Request shape
- **ID path param** → `options.id` in the controller
- **Body payload** → `data.<docName>[0]` (array-wrapped object)
- **Query string** → `frame.options.*`
- **Included relations** → `?include=user,followedUser`

## Endpoint Registration Flow

```
1. Create endpoint file
   ghost/core/core/server/api/endpoints/social-<name>.js

2. Register in index.js
   get social<Name>() {
       return apiFramework.pipeline(require('./social-<name>'), localUtils);
   }

3. Create route in custom-routes.js
   router.get('/social/<name>', mw.authAdminApi, http(api.social<Name>.browse));

4. Create Bookshelf model
   ghost/core/core/server/models/social-<name>.js

5. Create database migration
   ghost/core/core/server/data/migrations/versions/5.116/

6. Update schema if new table
   ghost/core/core/server/data/schema/schema.js
```

## Custom Action Types

Some endpoints extend beyond CRUD:

| Pattern | Example | Implementation |
|---------|---------|---------------|
| **Nested action** | `/social/comments/:id/like` | Custom handler name in controller |
| **Counts** | `/social/comments/counts/:ids` | Batch count endpoint |
| **Status** | `/social/comments/:id/status` | State transition |
| **Dispatch** | `/social/ai/reminders/dispatch` | Side-effect trigger |
| **Claim/Progress** | `/social/ai/media/jobs/claim` | Worker coordination |
| **Presign** | `/social/gallery/presign` | S3 signed URL generation |

## Error Handling

- Custom errors via `@tryghost/errors`
- Standard HTTP status codes
- Permission errors return 403
- Not found returns 404
- API key restriction returns 501 (Not Implemented)

# Middleware & Authentication

This is a critical part of the backend architecture — the middleware chain controls access to all `/social/*` endpoints and enforces permissions.

## authAdminApi Middleware Chain

File: `ghost/core/core/server/web/api/endpoints/admin/middleware.js`

All admin custom routes pass through this middleware array:

```javascript
module.exports.authAdminApi = [
    auth.authenticate.authenticateAdminApi,    // JWT or Bearer token validation
    auth.authorize.authorizeAdminApi,           // Role/permission assertion
    apiMw.updateUserLastSeen,                   // Track user online status
    apiMw.cors,                                  // Cross-origin headers
    shared.middleware.urlRedirects.adminSSLAndHostRedirect,  // Enforce HTTPS
    shared.middleware.prettyUrls,               // URL normalization
    notImplemented                              // API key resource allowlist
];
```

## The `notImplemented` Middleware

This is a key security layer that controls which resources API keys can access:

```javascript
const notImplemented = (req, res, next) => {
    // Bypass for session-authenticated users
    if (!req.api_key) return next();

    // Allow god_mode in development
    if (req.query.god_mode && process.env.NODE_ENV === 'development') return next();

    // API key allowlist — only these entities can use API keys
    const allowlisted = {
        posts: ['GET', 'PUT', 'DELETE', 'POST'],
        pages: ['GET', 'PUT', 'DELETE', 'POST'],
        members: ['GET', 'PUT', 'DELETE', 'POST'],
        tags: ['GET', 'PUT', 'DELETE', 'POST'],
        users: ['GET'],
        settings: ['GET'],
        // ... standard Ghost resources ...
        social: ['GET', 'POST', 'DELETE', 'PUT']  // ALL methods allowed
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
        message: 'Not implemented for API key access.',
        statusCode: 501
    }));
};
```

> **Key insight:** The `social` entity is allowlisted for all HTTP methods, meaning all `/social/*` endpoints are accessible via API keys — unlike other resources which may have restricted method access.

## Public Route Authentication

Public (content API) routes use lighter authentication:

```javascript
// AuthenticatePublic — validates member tokens or allows anonymous access
// Does not block unauthenticated requests, but enriches req with member info if token present
```

## Permission Objects

Custom social endpoints register permission objects through database migrations:

| Permission Object | Resource |
|-------------------|----------|
| `socialbookmark` | Bookmarks |
| `socialforward` | Forwards |
| `socialfollow` | Follows |
| `socialfavor` | Favors |
| `socialgroup` | Groups |
| `socialgroupmember` | Group members |
| `socialpostcomment` | Comments |
| `socialpostcommentlike` | Comment likes |
| `socialpostcommentreport` | Comment reports |
| `socialcomponent` | Components |
| `socialaidevice` | AI devices |
| `socialaismslog` | AI SMS logs |
| `socialaiuserphone` | AI user phones |
| `socialaiagentsetting` | AI agent settings |

Controllers enable permission checking with `permissions: true` in the handler definition.

## Route-Level vs Controller-Level Permissions

- **Route middleware** (`authAdminApi`) — ensures authenticated session/token
- **Controller permissions** (`permissions: true`) — checks role-based access to the resource
- **Custom business logic** — some endpoints (e.g., group members) implement additional checks like owner/admin role verification

# Page Routing & Navigation

Built on Next.js 14 App Router — file-system based routing with support for SSR, SSG, and client-side navigation.

## Route Map

| URL Pattern | Page | Rendering | Navigation Context |
|-------------|------|-----------|-------------------|
| `/` | Landing | SSR | Landing page |
| `/home` | User Home Feed | SSR | Authenticated |
| `/article/:slug` | Article | SSR/SSG | Public */ |
| `/group-article/:id` | Group Article | SSR | Group-scoped |
| `/author/:slug` | Author Page | SSR | Public |
| `/tag/:slug` | Tag Listing | SSR | Public |
| `/gallery` | Gallery | SSR | User Gallery |
| `/stories` | Stories Feed | SSR | SNS Stories |
| `/editor` | Content Editor | SSR | Authenticated |
| `/editor/:slug` | Edit Post | SSR | Authenticated |
| `/dashboard` | Dashboard | SSR | Authenticated |
| `/profile` | Profile Settings | SSR | Authenticated |
| `/ai` | AI Chat | SSR | Authenticated |
| `/pages` | Page Builder | SSR (stackpage) | Authenticated |
| `/pages-public/:slug` | Public Page | SSR | Public |
| `/panel` | Admin Panel | SSR | Admin |
| `/viewer` | Content Viewer | SSR | Authenticated |
| `/signup` | Registration | SSR | Public |
| `/link/:id` | Link Redirect | SSR | Public |
| `/reset` | Password Reset | SSR | Public |
| `/dev` | Dev Tools | SSR | Development |

## Ghost API Proxy (Rewrites)

The backend Ghost API is proxied to avoid CORS issues and centralize configuration:

```javascript
// next.config.js
async rewrites() {
    return [
        {
            source: "/ghost/api/:path*/",
            destination: `${process.env.GHOST_ADMIN_API_URL}/ghost/api/:path*/`,
        },
        {
            source: "/members/api/:path*/",
            destination: `${process.env.GHOST_ADMIN_API_URL}/members/api/:path*/`,
        },
    ];
}
```

## API Route Handlers

`src/app/api/` contains Next.js API route handlers that perform server-side logic:

| Handler Group | Function |
|---------------|----------|
| `/api/posts/*` | Post CRUD operations |
| `/api/authors/*` | Author data |
| `/api/tags/*` | Tag queries |
| `/api/comments/*` | SNS comment operations |
| `/api/groups/*` | Social group operations |
| `/api/pages/*` | Custom page management |
| `/api/pages-public/*` | Public page serving |
| `/api/settings/*` | Settings CRUD |
| `/api/storage/*` | S3/cloud file operations |
| `/api/eastate/*` | Eastate business logic |
| `/api/ai/*` | AI chat & search |
| `/api/internal/*` | Internal utilities |
| `/api/invites/*` | User invitations |
| `/api/dev/*` | Development endpoints |

## Navigation Flow

```
Public                    Authenticated
  │                           │
  ├── /                       ├── /home
  ├── /article/:slug          ├── /dashboard
  ├── /author/:slug           ├── /profile
  ├── /tag/:slug              ├── /gallery
  ├── /signup                 ├── /editor
  └── /link/:id               ├── /ai
                              ├── /pages
                              └── /panel
```

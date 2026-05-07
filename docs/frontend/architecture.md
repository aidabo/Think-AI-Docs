# Component Architecture

## Frontend Component Layers

```mermaid
flowchart TB
    subgraph Pages["Pages (app/*)"]
        Layout[Root Layout]
        Home[Home / Feed]
        Article[Article View]
        Gallery[Gallery]
        AI[AI Chat]
        Editor[Content Editor]
        PagesView[Pages / Page Builder]
    end
    
    subgraph Templates["Templates (templates/)"]
        Common[Common Layouts<br/>header / footer / sidebar]
        HomeT[Home Layouts<br/>feed arrangements]
        StoriesT[Stories Layouts<br/>story-style cards]
    end
    
    subgraph Components["Components (components/)"]
        direction TB
        Shared[Shared UI<br/>buttons / modals / cards / selectors]
        Domain[Domain Components<br/>article / gallery / ai / home]
        AI_Comp[AI Components<br/>chat / agents / voice]
    end
    
    subgraph Hooks["Hooks & Services"]
        Hooks[Custom React Hooks<br/>useAgentSettings / useSWR]
        Services[Ghost API Services<br/>postQuery / gallery / search]
    end
    
    subgraph State["State Management"]
        SWR[SWR<br/>Server State Cache]
        Zustand[Zustand<br/>Client UI State]
        Context[React Context<br/>Auth / Theme / Locale]
        Router[Next.js Router<br/>URL / Navigation State]
    end
    
    Pages --> Templates
    Pages --> Components
    Templates --> Components
    Components --> Hooks
    Components --> Services
    Components --> State
    Services -->|API Calls| Backend[(Ghost Backend)]
```

## Directory Structure

```
apps/host/src/
├── app/                     ← Next.js App Router pages
│   ├── layout.tsx           ← Root layout (providers, navigation)
│   ├── page.tsx             ← Home/landing
│   ├── home/                ← User home feed
│   ├── article/[slug]/      ← Article view (SSR/SSG)
│   ├── group-article/[id]/  ← Group-scoped article view
│   ├── author/[slug]/       ← Author profile
│   ├── tag/[slug]/          ← Tag listing
│   ├── gallery/             ← SNS gallery (photos)
│   ├── stories/             ← Stories feed
│   ├── editor/              ← Content creation editor
│   ├── dashboard/           ← User dashboard
│   ├── profile/             ← User profile/settings
│   ├── ai/                  ← AI chat interface
│   ├── pages/               ← Stackpage page builder
│   ├── pages-public/        ← Public rendered pages
│   ├── panel/               ← Admin panel
│   ├── viewer/              ← Content viewer
│   ├── signup/              ← User registration
│   ├── link/[id]/           ← Link redirect handler
│   ├── reset/               ← Password reset
│   ├── dev/                 ← Development tools
│   ├── ghost/               ← Ghost admin redirect
│   ├── api/                 ← API route handlers
│   ├── ClientLayout.tsx     ← Client-side layout wrapper
│   ├── globals.css          ← Global CSS
│   ├── robots.ts            ← Robots.txt generator
│   └── sitemap.ts           ← Sitemap generator
│
├── components/              ← Shared React components
│   ├── ai/                  ← AI chat components
│   ├── animations/          ← Animation utilities
│   ├── article/             ← Article display components
│   ├── dashboard/           ← Dashboard widgets
│   ├── demo/                ← Demo components
│   ├── gallery/             ← Gallery components
│   ├── home/                ← Home feed components
│   ├── pages/               ← Page builder components
│   ├── panel/               ← Panel/admin components
│   └── shared/              ← Shared UI (buttons, modals, cards)
│
├── hooks/                   ← Custom React hooks
├── contexts/                ← React context providers
├── lib/                     ← Utility modules
├── services/ghost/          ← Ghost API client modules
├── templates/               ← Page template components
├── config/                  ← Application config
├── data/                    ← Static/generated data
├── types/                   ← TypeScript type definitions
└── utils/                   ← General utility functions
```

## Component Layers

```
Pages (app/*)
    │
    ├── Templates (templates/)
    │   └── Composite page layouts
    │
    ├── Components (components/)
    │   └── Reusable UI elements
    │       ├── Pure presentational (shared/)
    │       ├── Domain-specific (article/, gallery/, ai/)
    │       └── Layout composites (home/, dashboard/)
    │
    └── Hooks / Services
        ├── hooks/ → React hooks (client-side logic)
        └── services/ghost/ → API interaction layer
```

## Service Layer (API Client)

`src/services/ghost/` encapsulates all communication with the Ghost backend:

| Service Module | Purpose |
|----------------|---------|
| `postQuery.ts` | Building post search/filter queries |
| `postReadCapabilities.ts` | Determining post read permissions |
| `postWriteCapabilities.ts` | Post creation/editing access |
| `postTransform.ts` | Transforming API responses for UI |
| `authorReadCapabilities.ts` | Author data access logic |
| `tagReadCapabilities.ts` | Tag data access |
| `galleryReadCapabilities.ts` | Gallery permissions |
| `groupPostRouting.ts` | Group-scoped post routing logic |
| `mediaJobReadCapabilities.ts` | Media job status queries |
| `aiSearchCapabilities.ts` | AI-powered search logic |

## Templates

The templates directory provides reusable page layouts:

- **`templates/common/`** — Shared layouts (header, footer, sidebar)
- **`templates/home/`** — Home feed layouts with different content arrangements
- **`templates/stories/`** — Stories-style layouts

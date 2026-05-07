# Think-AI Platform Documentation

**Think-AI** is an AI-powered social networking platform built on a customized Ghost CMS backend and a Next.js/React frontend. This documentation covers system architecture, API reference, deployment, and feature details.

## System Architecture Overview

```mermaid
graph TB
    subgraph Frontend["Think-AI Frontend (Next.js 14)"]
        AI[AI Assistant<br/>Multi-model Chat / Voice / Agents]
        PB[Page Builder<br/>StackPage Drag & Drop]
        SNS[SNS UI<br/>Feeds / Groups / Comments / Gallery]
    end

    subgraph Backend["Think-AI Backend (Ghost CMS Fork)"]
        GC[Ghost Core API<br/>200+ endpoints]
        CS[Custom Social API<br/>30+/social/* endpoints]
        AIB[AI Backend Services<br/>Chat / Reminders / Media Jobs / Voice]
    end

    subgraph Infra["Infrastructure"]
        DB[(MySQL 8)]
        S3[(AWS S3<br/>Media / Assets)]
        SNS_SVC[AWS SNS<br/>SMS Notifications]
        DOCK[Docker<br/>Containerized Deployment]
    end

    subgraph AI_Providers["AI Providers"]
        OA[OpenAI GPT-4o]
        GM[Google Gemini 2.5]
        DS[DeepSeek V3/R1]
        QW[Alibaba Qwen]
        ZP[Zhipu GLM-4]
    end

    Frontend -->|API Rewrites| Backend
    Frontend -->|WebSocket| QW
    Backend --> DB
    Backend --> S3
    Backend --> SNS_SVC
    Frontend --> AI_Providers
    Backend --> AI_Providers
```

## [Think-AI Backend](/backend/)

A heavily customized fork of Ghost CMS v5.116.2 — the server-side foundation.

```
00-Ghost-5.116.2/          ← Backend (Express/Node.js + MySQL)
```

- **30+ custom `/social/*` API endpoints** — social graph, groups, comments, galleries
- **Custom Express middleware chain** — authentication, authorization, API key control
- **40+ database migrations** — social & AI features layered on Ghost's schema
- **AI integration** — chat, reminders, media processing, voice, agents
- **Prometheus metrics, Tinybird analytics, ActivityPub support**

[Backend docs →](/backend/)

## [Think-AI Frontend](/frontend/)

A Next.js 14 application delivering AI-powered social experiences.

```
01-jibunsee-react/         ← Frontend (Next.js/React + TypeScript)
```

- **Next.js 14 App Router** — multi-page SPA with SSR/SSG
- **SNS-specific UI** — group feeds, social comments, galleries, AI chat
- **Visual Page Builder (StackPage)** — drag-and-drop page composition with data binding
- **AI-powered features** — streaming chat, voice interaction, image generation, content creation
- **AI Assistant** — multi-agent system with real-time voice, reminders, search, and media processing
- **Docker deployment** — standalone Next.js server + media worker + Qwen RT proxy

[Frontend docs →](/frontend/)

---

> **Repository locations (on WSL2):**
> `/home/aidabo/work/legacy/00-Ghost-5.116.2` — Backend
> `/home/aidabo/work/legacy/01-jibunsee-react` — Frontend

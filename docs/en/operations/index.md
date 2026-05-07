# Operations Manual

Guides for setting up, managing, and operating the Think-AI platform.

---

## Quick Start

```mermaid
flowchart LR
    A[Environment<br/>Docker / AWS] --> B[Deploy<br/>docker compose up]
    B --> C[Initial Setup<br/>Admin Account]
    C --> D[AI Connection<br/>API Keys]
    D --> E[Go Live]
```

| Step | Duration | Details |
|------|---------|---------|
| Environment Setup | 1-2 hrs | [Deployment Guide →](deployment) |
| Deploy | 10 min | Start with Docker Compose |
| Initial Setup | 30 min | Admin account, site settings |
| AI Connection | 15 min | AI provider API key setup |

---

## Sections

| Section | Audience | Content |
|---------|----------|---------|
| [Deployment Guide](deployment) | Infrastructure | Docker config, AWS setup, environment variables |
| [Admin Guide](admin-guide) | Site Admins | User management, content management, AI settings |
| [User Guide](user-guide) | End Users | Basic operations, AI features usage |
| [Troubleshooting](troubleshooting) | Everyone | Common issues and solutions |

## System Architecture

```mermaid
graph TB
    subgraph Docker["Docker Container Setup"]
        NGINX[Nginx<br/>Reverse Proxy]
        GHOST[Ghost App<br/>Express / Node.js]
        MYSQL[(MySQL 8<br/>Database)]
        NEXT[Next.js App<br/>Frontend SSR]
        QWEN[Qwen RT Proxy<br/>WebSocket]
        WORKER[Media Worker<br/>ffmpeg]
    end

    subgraph External["External Services"]
        S3[(AWS S3)]
        SNS_SVC[AWS SNS]
        AI_PROV[AI Providers<br/>OpenAI / Gemini / DeepSeek...]
    end

    NGINX --> GHOST
    NGINX --> NEXT
    GHOST --> MYSQL
    GHOST --> S3
    GHOST --> SNS_SVC
    NEXT --> QWEN
    NEXT --> AI_PROV
    GHOST --> AI_PROV
```

# Think-AI 平台文档

**Think-AI** 是一个基于定制化 Ghost CMS 后端和 Next.js/React 前端的 AI 驱动社交网络平台。本文档涵盖系统架构、API 参考、部署和功能详情。

## [Think-AI Backend](/zh/backend/)

基于 Ghost CMS v5.116.2 深度定制的服务端基础。

- **30+ 自定义 `/social/*` API 端点** — 社交图谱、群组、评论、图库
- **自定义 Express 中间件链** — 认证、授权、API 密钥控制
- **40+ 数据库迁移** — 社交和 AI 功能
- **AI 集成** — 聊天、提醒、媒体处理、语音、智能体
- **Prometheus 监控、Tinybird 分析、ActivityPub 支持**

[后端文档 →](/zh/backend/)

## [Think-AI Frontend](/zh/frontend/)

基于 Next.js 14 的 AI 驱动社交前端应用。

- **Next.js 14 App Router** — 支持 SSR/SSG 的多页面 SPA
- **SNS 专属 UI** — 群组信息流、社交评论、图库、AI 聊天
- **可视化页面构建器 (StackPage)** — 拖拽式页面组合与数据绑定
- **AI 功能** — 流式聊天、语音交互、图像生成、内容创作
- **AI 助手** — 多智能体系统，支持实时语音、提醒、搜索和媒体处理
- **Docker 部署** — 独立 Next.js 服务器 + 媒体工作节点 + Qwen RT 代理

[前端文档 →](/zh/frontend/)

---

> **仓库路径 (WSL2):**
> `/home/aidabo/work/legacy/00-Ghost-5.116.2` — 后端
> `/home/aidabo/work/legacy/01-jibunsee-react` — 前端

# 组件架构

## 前端组件层次

```mermaid
flowchart TB
    subgraph Pages["页面 (app/*)"]
        Layout[根布局]
        Home[首页 / 动态]
        Article[文章视图]
        Gallery[图库]
        AI[AI 聊天]
        Editor[内容编辑器]
        PagesView[页面 / 页面构建器]
    end
    
    subgraph Templates["模板 (templates/)"]
        Common[通用布局<br/>页头 / 页脚 / 侧边栏]
        HomeT[首页布局<br/>动态排列]
        StoriesT[故事布局<br/>故事风格卡片]
    end
    
    subgraph Components["组件 (components/)"]
        direction TB
        Shared[共享 UI<br/>按钮 / 模态框 / 卡片 / 选择器]
        Domain[领域组件<br/>文章 / 图库 / AI / 首页]
        AI_Comp[AI 组件<br/>聊天 / 智能体 / 语音]
    end
    
    subgraph Hooks["钩子与服务"]
        Hooks[自定义 React 钩子<br/>useAgentSettings / useSWR]
        Services[Ghost API 服务<br/>postQuery / gallery / search]
    end
    
    subgraph State["状态管理"]
        SWR[SWR<br/>服务端状态缓存]
        Zustand[Zustand<br/>客户端 UI 状态]
        Context[React Context<br/>认证 / 主题 / 语言]
        Router[Next.js 路由<br/>URL / 导航状态]
    end
    
    Pages --> Templates
    Pages --> Components
    Templates --> Components
    Components --> Hooks
    Components --> Services
    Components --> State
    Services -->|API 调用| Backend[(Ghost 后端)]
```

## 目录结构

```
apps/host/src/
├── app/                     ← Next.js App Router 页面
│   ├── layout.tsx           ← 根布局（提供者、导航）
│   ├── page.tsx             ← 首页/着陆页
│   ├── home/                ← 用户首页动态
│   ├── article/[slug]/      ← 文章视图 (SSR/SSG)
│   ├── group-article/[id]/  ← 群组范围文章视图
│   ├── author/[slug]/       ← 作者主页
│   ├── tag/[slug]/          ← 标签列表
│   ├── gallery/             ← SNS 图库（照片）
│   ├── stories/             ← 故事动态
│   ├── editor/              ← 内容创建编辑器
│   ├── dashboard/           ← 用户仪表盘
│   ├── profile/             ← 用户资料/设置
│   ├── ai/                  ← AI 聊天界面
│   ├── pages/               ← StackPage 页面构建器
│   ├── pages-public/        ← 公开渲染页面
│   ├── panel/               ← 管理面板
│   ├── viewer/              ← 内容查看器
│   ├── signup/              ← 用户注册
│   ├── link/[id]/           ← 链接重定向处理器
│   ├── reset/               ← 密码重置
│   ├── dev/                 ← 开发工具
│   ├── ghost/               ← Ghost 管理重定向
│   ├── api/                 ← API 路由处理器
│   ├── ClientLayout.tsx     ← 客户端布局包装
│   ├── globals.css          ← 全局 CSS
│   ├── robots.ts            ← Robots.txt 生成器
│   └── sitemap.ts           ← 网站地图生成器
│
├── components/              ← 共享 React 组件
│   ├── ai/                  ← AI 聊天组件
│   ├── animations/          ← 动画工具
│   ├── article/             ← 文章展示组件
│   ├── dashboard/           ← 仪表盘组件
│   ├── demo/                ← 演示组件
│   ├── gallery/             ← 图库组件
│   ├── home/                ← 首页动态组件
│   ├── pages/               ← 页面构建器组件
│   ├── panel/               ← 面板/管理组件
│   └── shared/              ← 共享 UI（按钮、模态框、卡片）
│
├── hooks/                   ← 自定义 React 钩子
├── contexts/                ← React context 提供者
├── lib/                     ← 工具模块
├── services/ghost/          ← Ghost API 客户端模块
├── templates/               ← 页面模板组件
├── config/                  ← 应用配置
├── data/                    ← 静态/生成数据
├── types/                   ← TypeScript 类型定义
└── utils/                   ← 通用工具函数
```

## 组件层次

```
页面 (app/*)
    │
    ├── 模板 (templates/)
    │   └── 复合页面布局
    │
    ├── 组件 (components/)
    │   └── 可复用 UI 元素
    │       ├── 纯展示型 (shared/)
    │       ├── 领域特定 (article/, gallery/, ai/)
    │       └── 布局组合 (home/, dashboard/)
    │
    └── 钩子 / 服务
        ├── hooks/ → React 钩子（客户端逻辑）
        └── services/ghost/ → API 交互层
```

## 服务层（API 客户端）

`src/services/ghost/` 封装了与 Ghost 后端的所有通信：

| 服务模块 | 用途 |
|----------------|---------|
| `postQuery.ts` | 构建文章搜索/筛选查询 |
| `postReadCapabilities.ts` | 确定文章读取权限 |
| `postWriteCapabilities.ts` | 文章创建/编辑权限 |
| `postTransform.ts` | 转换 API 响应以供 UI 使用 |
| `authorReadCapabilities.ts` | 作者数据访问逻辑 |
| `tagReadCapabilities.ts` | 标签数据访问 |
| `galleryReadCapabilities.ts` | 图库权限 |
| `groupPostRouting.ts` | 群组范围文章路由逻辑 |
| `mediaJobReadCapabilities.ts` | 媒体任务状态查询 |
| `aiSearchCapabilities.ts` | AI 驱动的搜索逻辑 |

## 模板

模板目录提供可复用的页面布局：

- **`templates/common/`** — 共享布局（页头、页脚、侧边栏）
- **`templates/home/`** — 首页动态布局，不同的内容排列方式
- **`templates/stories/`** — 故事风格布局

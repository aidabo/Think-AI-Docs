import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid"

export default withMermaid({
  title: 'Think-AI',
  description: 'Think-AI platform documentation',
  ignoreDeadLinks: true,

  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      title: 'Think-AI',
      description: 'Think-AI プラットフォーム ドキュメント',
      themeConfig: {
        logo: undefined,
        socialLinks: [],
        footer: { message: 'Think-AI Platform Documentation — AI-powered social platform.' },
        siteTitle: 'Think-AI Docs',
        nav: [
          { text: 'ホーム', link: '/' },
          { text: '概要', link: '/think-ai-overview' },
          { text: '📄 PDF資料', link: '/think-ai-overview.pdf' },
          { text: '🏢 不動産Vision', link: '/real-estate-vision.pdf' },
          { text: 'Backend', link: '/backend/' },
          { text: 'Frontend', link: '/frontend/' },
          { text: 'マーケティング', link: '/marketing/' },
          { text: '運用', link: '/operations/' },
        ],
        sidebar: {
          '/backend/': [
            { text: 'Think-AI Backend', items: [
              { text: '概要', link: '/backend/' },
              { text: 'サーバーアーキテクチャ', link: '/backend/architecture' },
              { text: 'API デザインパターン', link: '/backend/api-design' },
              { text: 'カスタム Social API', link: '/backend/social-api/' },
              { text: 'ミドルウェアと認証', link: '/backend/middleware' },
              { text: 'Docker デプロイ', link: '/backend/docker-deployment' },
            ]},
            { text: 'Social API リファレンス', items: [
              { text: 'ルート一覧', link: '/backend/social-api/routes' },
              { text: 'モデルとスキーマ', link: '/backend/social-api/models' },
              { text: 'サービス', link: '/backend/social-api/services' },
              { text: 'AI 機能', link: '/backend/social-api/ai-features' },
            ]},
          ],
          '/frontend/': [
            { text: 'Think-AI Frontend', items: [
              { text: '概要', link: '/frontend/' },
              { text: 'コンポーネントアーキテクチャ', link: '/frontend/architecture' },
              { text: 'ページルーティング', link: '/frontend/routing' },
              { text: '状態管理', link: '/frontend/state-management' },
              { text: '環境設定', link: '/frontend/environment' },
              { text: 'Docker デプロイ', link: '/frontend/docker' },
              { text: 'Page Builder', link: '/frontend/page-builder' },
              { text: 'AI アシスタント', link: '/frontend/ai-assistant' },
            ]},
          ],
          '/marketing/': [
            { text: 'マーケティング', items: [
              { text: '概要', link: '/marketing/' },
              { text: '機能一覧', link: '/marketing/features' },
              { text: '競合比較', link: '/marketing/comparison' },
              { text: 'ユースケース', link: '/marketing/use-cases' },
              { text: '価格モデル', link: '/marketing/pricing' },
            ]},
          ],
          '/operations/': [
            { text: '運用マニュアル', items: [
              { text: '概要', link: '/operations/' },
              { text: 'デプロイメントガイド', link: '/operations/deployment' },
              { text: '管理者ガイド', link: '/operations/admin-guide' },
              { text: 'ユーザーガイド', link: '/operations/user-guide' },
              { text: 'トラブルシューティング', link: '/operations/troubleshooting' },
            ]},
          ],
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'Think-AI',
      description: 'Think-AI Platform Documentation',
      themeConfig: {
        logo: undefined,
        socialLinks: [],
        footer: { message: 'Think-AI Platform Documentation — AI-powered social platform.' },
        siteTitle: 'Think-AI Docs',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Overview', link: '/en/think-ai-overview' },
          { text: '📄 PDF', link: '/think-ai-overview-en.pdf' },
          { text: '🏢 Real Estate', link: '/real-estate-vision-en.pdf' },
          { text: 'Backend', link: '/en/backend/' },
          { text: 'Frontend', link: '/en/frontend/' },
          { text: 'Marketing', link: '/en/marketing/' },
          { text: 'Operations', link: '/en/operations/' },
        ],
        sidebar: {
          '/en/backend/': [
            { text: 'Think-AI Backend', items: [
              { text: 'Overview', link: '/en/backend/' },
              { text: 'Server Architecture', link: '/en/backend/architecture' },
              { text: 'API Design Patterns', link: '/en/backend/api-design' },
              { text: 'Custom Social API', link: '/en/backend/social-api/' },
              { text: 'Middleware & Auth', link: '/en/backend/middleware' },
              { text: 'Docker Deployment', link: '/en/backend/docker-deployment' },
            ]},
            { text: 'Social API Reference', items: [
              { text: 'Route Catalog', link: '/en/backend/social-api/routes' },
              { text: 'Models & Schema', link: '/en/backend/social-api/models' },
              { text: 'Services', link: '/en/backend/social-api/services' },
              { text: 'AI Features', link: '/en/backend/social-api/ai-features' },
            ]},
          ],
          '/en/frontend/': [
            { text: 'Think-AI Frontend', items: [
              { text: 'Overview', link: '/en/frontend/' },
              { text: 'Component Architecture', link: '/en/frontend/architecture' },
              { text: 'Page Routing', link: '/en/frontend/routing' },
              { text: 'State Management', link: '/en/frontend/state-management' },
              { text: 'Environment Config', link: '/en/frontend/environment' },
              { text: 'Docker Deployment', link: '/en/frontend/docker' },
              { text: 'Page Builder', link: '/en/frontend/page-builder' },
              { text: 'AI Assistant', link: '/en/frontend/ai-assistant' },
            ]},
          ],
          '/en/marketing/': [
            { text: 'Marketing', items: [
              { text: 'Overview', link: '/en/marketing/' },
              { text: 'Features', link: '/en/marketing/features' },
              { text: 'Comparison', link: '/en/marketing/comparison' },
              { text: 'Use Cases', link: '/en/marketing/use-cases' },
              { text: 'Pricing', link: '/en/marketing/pricing' },
            ]},
          ],
          '/en/operations/': [
            { text: 'Operations', items: [
              { text: 'Overview', link: '/en/operations/' },
              { text: 'Deployment Guide', link: '/en/operations/deployment' },
              { text: 'Admin Guide', link: '/en/operations/admin-guide' },
              { text: 'User Guide', link: '/en/operations/user-guide' },
              { text: 'Troubleshooting', link: '/en/operations/troubleshooting' },
            ]},
          ],
        },
      },
    },
    zh: {
      label: '中文',
      lang: 'zh',
      title: 'Think-AI',
      description: 'Think-AI 平台文档',
      themeConfig: {
        logo: undefined,
        socialLinks: [],
        footer: { message: 'Think-AI Platform Documentation — AI-powered social platform.' },
        siteTitle: 'Think-AI Docs',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '概述', link: '/zh/think-ai-overview' },
          { text: '📄 PDF', link: '/think-ai-overview-zh.pdf' },
          { text: '🏢 房地产', link: '/real-estate-vision-zh.pdf' },
          { text: 'Backend', link: '/zh/backend/' },
          { text: 'Frontend', link: '/zh/frontend/' },
          { text: '营销', link: '/zh/marketing/' },
          { text: '运维', link: '/zh/operations/' },
        ],
        sidebar: {
          '/zh/backend/': [
            { text: 'Think-AI Backend', items: [
              { text: '概述', link: '/zh/backend/' },
              { text: '服务器架构', link: '/zh/backend/architecture' },
              { text: 'API 设计模式', link: '/zh/backend/api-design' },
              { text: '自定义 Social API', link: '/zh/backend/social-api/' },
              { text: '中间件与认证', link: '/zh/backend/middleware' },
              { text: 'Docker 部署', link: '/zh/backend/docker-deployment' },
            ]},
            { text: 'Social API 参考', items: [
              { text: '路由目录', link: '/zh/backend/social-api/routes' },
              { text: '模型与模式', link: '/zh/backend/social-api/models' },
              { text: '服务', link: '/zh/backend/social-api/services' },
              { text: 'AI 功能', link: '/zh/backend/social-api/ai-features' },
            ]},
          ],
          '/zh/frontend/': [
            { text: 'Think-AI Frontend', items: [
              { text: '概述', link: '/zh/frontend/' },
              { text: '组件架构', link: '/zh/frontend/architecture' },
              { text: '页面路由', link: '/zh/frontend/routing' },
              { text: '状态管理', link: '/zh/frontend/state-management' },
              { text: '环境配置', link: '/zh/frontend/environment' },
              { text: 'Docker 部署', link: '/zh/frontend/docker' },
              { text: '页面构建器', link: '/zh/frontend/page-builder' },
              { text: 'AI 助手', link: '/zh/frontend/ai-assistant' },
            ]},
          ],
          '/zh/marketing/': [
            { text: '营销', items: [
              { text: '概述', link: '/zh/marketing/' },
              { text: '功能列表', link: '/zh/marketing/features' },
              { text: '竞品对比', link: '/zh/marketing/comparison' },
              { text: '使用场景', link: '/zh/marketing/use-cases' },
              { text: '定价模式', link: '/zh/marketing/pricing' },
            ]},
          ],
          '/zh/operations/': [
            { text: '运维', items: [
              { text: '概述', link: '/zh/operations/' },
              { text: '部署指南', link: '/zh/operations/deployment' },
              { text: '管理员指南', link: '/zh/operations/admin-guide' },
              { text: '用户指南', link: '/zh/operations/user-guide' },
              { text: '故障排除', link: '/zh/operations/troubleshooting' },
            ]},
          ],
        },
      },
    },
  },
})

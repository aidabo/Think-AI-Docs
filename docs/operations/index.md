# 運用マニュアル

Think-AI プラットフォームのセットアップ、管理、運用のためのガイドです。

---

## クイックスタート

```mermaid
flowchart LR
    A[環境準備<br/>Docker / AWS] --> B[デプロイ<br/>docker compose up]
    B --> C[初期設定<br/>管理者アカウント]
    C --> D[AI 接続設定<br/>API キー入力]
    D --> E[運用開始]
```

| ステップ | 所要時間 | 詳細 |
|---------|---------|------|
| 環境準備 | 1-2 時間 | [デプロイメントガイド →](deployment) |
| デプロイ | 10 分 | Docker Compose で起動 |
| 初期設定 | 30 分 | 管理者アカウント、サイト設定 |
| AI 接続 | 15 分 | AI プロバイダの API キー設定 |

---

## 目次

| セクション | 対象読者 | 内容 |
|-----------|---------|------|
| [デプロイメントガイド](deployment) | インフラ担当 | Docker 構成、AWS セットアップ、環境変数 |
| [管理者ガイド](admin-guide) | サイト管理者 | ユーザー管理、コンテンツ管理、AI 設定 |
| [ユーザーガイド](user-guide) | エンドユーザー | 基本操作、AI 機能の使い方 |
| [トラブルシューティング](troubleshooting) | 全員 | よくある問題と解決策 |

## システム構成

```mermaid
graph TB
    subgraph Docker["Docker コンテナ構成"]
        NGINX[Nginx<br/>リバースプロキシ]
        GHOST[Ghost App<br/>Express / Node.js]
        MYSQL[(MySQL 8<br/>データベース)]
        NEXT[Next.js App<br/>Frontend SSR]
        QWEN[Qwen RT Proxy<br/>WebSocket]
        WORKER[Media Worker<br/>ffmpeg]
    end

    subgraph External["外部サービス"]
        S3[(AWS S3)]
        SNS_SVC[AWS SNS]
        AI_PROV[AI プロバイダ<br/>OpenAI / Gemini / DeepSeek...]
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

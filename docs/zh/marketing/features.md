# Think-AI 功能列表

## 功能类别

```mermaid
graph TB
    subgraph Platform["平台基础"]
        CMS[Ghost CMS 兼容<br/>200+ API 端点]
        CUSTOM[自定义 Social API<br/>30+ /social/* 端点]
        DOCKER[Docker 容器<br/>一键部署]
    end

    subgraph AI["AI 功能"]
        CHAT[多模型聊天<br/>GPT-4o / Gemini / DeepSeek / Qwen / GLM]
        VOICE[实时语音对话<br/>Gemini / OpenAI / Qwen Voice]
        IMAGE[AI 图像生成<br/>DALL-E / Wanxiang / Stable Diffusion]
        MEDIA[媒体处理管道<br/>转录 / 翻译 / 缩略图]
        AGENT[AI 代理<br/>图像 / 搜索 / 提醒 / 语音]
    end

    subgraph SNS["SNS 功能"]
        GROUP[群组管理<br/>所有者 / 管理员 / 成员]
        COMMENT[扩展评论<br/>点赞 / 回复 / 举报 / 审核]
        GRAPH[社交图谱<br/>关注 / 收藏 / 喜欢]
        GALLERY[相册<br/>S3 签名上传]
    end

    subgraph Builder["Page Builder"]
        PB_DRAG[拖放编辑<br/>可视化布局]
        PB_DATA[数据绑定<br/>API 集成]
        PB_TEMPLATE[模板管理<br/>可复用]
        PB_PUBLIC[公开页面<br/>外部共享]
    end

    subgraph Operation["运维功能"]
        MONITOR[Prometheus 监控]
        ANALYTICS[Tinybird 分析]
        AUDIT[审计日志]
        ACTIVITY[用户活动]
    end

    Platform --> AI
    Platform --> SNS
    Platform --> Builder
    Platform --> Operation
```

## 功能详情

### AI 助手

| 功能 | 提供商 | 状态 |
|------|--------|------|
| 文本聊天（流式） | OpenAI, Gemini, DeepSeek, Qwen, Zhipu GLM | ✅ 已完成 |
| 对话历史管理 | 所有提供商 | ✅ 已完成 |
| 上下文感知搜索 | RAG 管道 | ✅ 已完成 |
| 模型自动路由 | 按任务选择最佳模型 | ✅ 已完成 |

### 社交功能

| 功能 | 描述 | 状态 |
|------|------|------|
| 群组 | 创建、加入、角色管理 | ✅ 已完成 |
| 评论 | CRUD、点赞、回复、举报、审核 | ✅ 已完成 |
| 关注 | 关注/取消关注、粉丝列表 | ✅ 已完成 |
| 收藏 | 文章/帖子收藏管理 | ✅ 已完成 |
| 相册 | 用户/群组相册、S3 上传 | ✅ 已完成 |
| 活动日志 | 用户审计跟踪 | ✅ 已完成 |

### Page Builder

| 功能 | 描述 | 状态 |
|------|------|------|
| 拖放编辑 | gridstack 直观布局 | ✅ 已完成 |
| 数据绑定 | 动态 API 数据集成 | ✅ 已完成 |
| 属性编辑器 | JSON Schema 驱动编辑 | ✅ 已完成 |
| 转换器管道 | 日期、货币、数字格式化 | ✅ 已完成 |
| 公开页面 | 外部用户页面发布 | ✅ 已完成 |

---

[返回营销首页 →](index)

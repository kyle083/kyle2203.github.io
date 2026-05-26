# Kyle 的个人网站

基于 **Astro + React + Tailwind CSS** 构建的现代化个人网站，聚焦 AI 开发学习与量化交易研究。

## 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [React](https://react.dev/) - 交互式组件（Islands 架构）
- [Tailwind CSS](https://tailwindcss.com/) - 原子化样式
- [Framer Motion](https://www.framer.com/motion/) - 动画效果
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/) - 量化图表

## 网站结构

- **首页** - Hero 打字机效果 + 最新文章/项目 + 技术栈展示
- **AI 实验室** - AI 学习笔记、论文复现、模型实验
- **量化交易** - 策略研究、回测数据、交易日志（含交互式图表）
- **项目集** - AI 项目 + 量化项目展示
- **博客** - 所有文章合集
- **关于** - 个人介绍 + 学习历程时间线

## 本地开发

```bash
npm install
npm run dev
```

## 部署

项目配置了 GitHub Actions，推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

```bash
git add .
git commit -m "update site"
git push origin main
```

## 添加文章

在 `src/content/posts/` 目录下新建 `.mdx` 文件：

```mdx
---
title: '文章标题'
description: '文章简介'
pubDate: 2025-01-01
category: 'ai'  # ai | quant | other
tags: ['标签1', '标签2']
featured: true
---

文章内容支持 Markdown 和 JSX 组件...
```

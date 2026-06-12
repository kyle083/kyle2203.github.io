#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'posts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question, defaultValue = '') {
  return new Promise((resolve) => {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(prompt, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
    .replace(/-+$/, '');
}

async function main() {
  console.log('\n📝 创建新文章\n');

  const title = await ask('文章标题');
  if (!title) {
    console.log('❌ 标题不能为空');
    process.exit(1);
  }

  const description = await ask('文章简介');
  const category = await ask('分类 (ai/quant/other)', 'other');
  if (!['ai', 'quant', 'other'].includes(category)) {
    console.log('❌ 分类必须是 ai、quant 或 other');
    process.exit(1);
  }

  const tagsInput = await ask('标签（用逗号分隔）', '');
  const tags = tagsInput
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const featured = (await ask('是否设为精选 (y/n)', 'n')).toLowerCase() === 'y';
  const today = new Date().toISOString().split('T')[0];
  const pubDate = await ask('发布日期 (YYYY-MM-DD)', today);

  const slug = slugify(title);
  const filename = `${category}-${slug}-${pubDate}.mdx`;
  const filepath = join(POSTS_DIR, filename);

  if (existsSync(filepath)) {
    console.log(`❌ 文件已存在：${filepath}`);
    process.exit(1);
  }

  const tagsYaml = tags.length > 0 ? `\n  - ${tags.join('\n  - ')}` : '';
  const content = `---
title: '${title.replace(/'/g, "\\'")}'
description: '${description.replace(/'/g, "\\'")}'
pubDate: ${pubDate}
category: '${category}'
tags:${tagsYaml}
featured: ${featured}
---

在这里开始写文章正文...

## 小节标题

支持 Markdown 语法，也可以插入 React 组件：

<MyComponent client:load />
`;

  writeFileSync(filepath, content, 'utf-8');
  console.log(`\n✅ 文章已创建：src/content/posts/${filename}`);
  console.log(`👉 本地预览：npm run dev，然后访问 /blog`);

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

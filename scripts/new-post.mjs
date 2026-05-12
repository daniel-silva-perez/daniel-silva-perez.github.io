#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new:post -- "Post title here"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'content', 'blog');
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`Refusing to overwrite existing file: ${file}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
pubDate: ${today}
category: ""
tags: []
draft: true
---

Write here.
`;

writeFileSync(file, frontmatter, 'utf8');
console.log(`Created ${file}`);

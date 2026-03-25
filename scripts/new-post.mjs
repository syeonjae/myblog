import fs from "node:fs";
import path from "node:path";

const titleArg = process.argv[2] ?? "새 글 제목";
const categoryArg = process.argv[3] ?? "blog";

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
const hh = String(now.getHours()).padStart(2, "0");
const mi = String(now.getMinutes()).padStart(2, "0");
const ss = String(now.getSeconds()).padStart(2, "0");

const tzOffset = -now.getTimezoneOffset();
const sign = tzOffset >= 0 ? "+" : "-";
const tzH = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, "0");
const tzM = String(Math.abs(tzOffset) % 60).padStart(2, "0");
const iso = `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${tzH}:${tzM}`;

const slug = titleArg
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9가-힣\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const fileName = `${yyyy}-${mm}-${dd}-${slug || "new-post"}.mdx`;
const postsDir = path.join(process.cwd(), "content", "posts");
const filePath = path.join(postsDir, fileName);

if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
if (fs.existsSync(filePath)) {
  console.error(`이미 파일이 존재합니다: ${filePath}`);
  process.exit(1);
}

const content = `---
title: "${titleArg.replace(/"/g, "\\\"")}"
date: "${iso}"
description: "요약을 적어주세요"
category: "${categoryArg}"
tags: ["${categoryArg}"]
series: null
draft: false
---

# ${titleArg}

내용을 작성하세요.
`;

fs.writeFileSync(filePath, content, "utf-8");
console.log(`생성 완료: ${filePath}`);

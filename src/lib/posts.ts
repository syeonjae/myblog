import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  categorySlug: string;
  series: string | null;
  draft: boolean;
  readingMinutes: number;
};

export function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parsePostMeta(file: string, raw: string): PostMeta {
  const slug = file.replace(/\.(mdx|md)$/i, "");
  const { data, content } = matter(raw);

  const category = String(data.category ?? "uncategorized");

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category,
    categorySlug: toSlug(category),
    series: data.series ? String(data.series) : null,
    draft: Boolean(data.draft ?? false),
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function getAllPostMeta(options?: { includeDraft?: boolean }): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const includeDraft = options?.includeDraft ?? false;

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      return parsePostMeta(file, raw);
    })
    .filter((post) => (includeDraft ? true : !post.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSource(slug: string) {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const target = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(target)) return null;

  const raw = fs.readFileSync(target, "utf-8");
  const meta = parsePostMeta(path.basename(target), raw);
  const { content } = matter(raw);

  return { meta, content };
}

export function getAllCategories() {
  const map = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of getAllPostMeta()) {
    const found = map.get(post.categorySlug);
    if (found) {
      found.count += 1;
    } else {
      map.set(post.categorySlug, {
        name: post.category,
        slug: post.categorySlug,
        count: 1,
      });
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPostMeta().filter((post) => post.categorySlug === categorySlug);
}

export function getAllTags() {
  const map = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of getAllPostMeta()) {
    for (const tag of post.tags) {
      const slug = toSlug(tag);
      const found = map.get(slug);
      if (found) {
        found.count += 1;
      } else {
        map.set(slug, { name: tag, slug, count: 1 });
      }
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTag(tagSlug: string) {
  return getAllPostMeta().filter((post) => post.tags.some((tag) => toSlug(tag) === tagSlug));
}

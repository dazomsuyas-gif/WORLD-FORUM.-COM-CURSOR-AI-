import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type CreatorScript = {
  slug: string;
  title: string;
  description?: string;
  publishedAt?: string;
  readingMinutes?: number;
};

export type CreatorScriptFull = CreatorScript & { html: string };

function scriptsRoot() {
  return path.join(process.cwd(), "content", "creator", "scripts");
}

export function getAllScripts(): CreatorScript[] {
  const root = scriptsRoot();
  if (!fs.existsSync(root)) return [];
  const files = fs.readdirSync(root, { withFileTypes: true });
  const out: CreatorScript[] = [];
  for (const f of files) {
    if (!f.isFile() || !f.name.endsWith(".md")) continue;
    const slug = f.name.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(root, f.name), "utf8");
    const parsed = matter(raw);
    const fm = parsed.data as any;
    if (!fm?.title) continue;
    out.push({
      slug,
      title: String(fm.title),
      description: fm.description ? String(fm.description) : undefined,
      publishedAt: fm.publishedAt ? String(fm.publishedAt) : undefined,
      readingMinutes:
        typeof fm.readingMinutes === "number" ? fm.readingMinutes : undefined,
    });
  }
  return out.sort((a, b) =>
    (b.publishedAt ?? "0000-00-00").localeCompare(a.publishedAt ?? "0000-00-00"),
  );
}

export function getScriptFull(slug: string): CreatorScriptFull | null {
  const fullPath = path.join(scriptsRoot(), `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as any;
  if (!fm?.title) return null;
  const html = marked.parse(parsed.content, { async: false }) as string;
  return {
    slug,
    title: String(fm.title),
    description: fm.description ? String(fm.description) : undefined,
    publishedAt: fm.publishedAt ? String(fm.publishedAt) : undefined,
    readingMinutes:
      typeof fm.readingMinutes === "number" ? fm.readingMinutes : undefined,
    html,
  };
}


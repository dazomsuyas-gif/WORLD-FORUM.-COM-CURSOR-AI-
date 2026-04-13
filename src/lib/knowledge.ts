import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type KnowledgeCategory =
  | "richest"
  | "science"
  | "nature"
  | "culture"
  | "food"
  | "health"
  | "tourism"
  | "library"
  | "trends"
  | "empires"
  | "economies"
  | "wars";

export const KNOWLEDGE_CATEGORIES: Array<{
  slug: KnowledgeCategory;
  title: string;
  accentVar:
    | "--richest"
    | "--science"
    | "--nature"
    | "--culture"
    | "--food"
    | "--health"
    | "--tourism"
    | "--empires"
    | "--wars"
    | "--stories"
    | "--community"
    | "--marketplace"
    | "--gold";
  description: string;
}> = [
  {
    slug: "richest",
    title: "Richest People",
    accentVar: "--gold",
    description: "Wealth, power, dynasties, and the systems behind the numbers.",
  },
  {
    slug: "science",
    title: "Science & Technology",
    accentVar: "--science",
    description: "Ideas, inventions, and breakthroughs that changed the world.",
  },
  {
    slug: "nature",
    title: "Nature",
    accentVar: "--nature",
    description: "Earth’s wild systems—from oceans to mountains to climate.",
  },
  {
    slug: "culture",
    title: "Culture",
    accentVar: "--culture",
    description: "Art, identity, rituals, and the stories societies tell themselves.",
  },
  {
    slug: "food",
    title: "Food",
    accentVar: "--food",
    description: "Cuisine, trade, agriculture, and the history inside every bite.",
  },
  {
    slug: "health",
    title: "Health",
    accentVar: "--health",
    description: "Medicine, wellness, and how we keep societies alive.",
  },
  {
    slug: "tourism",
    title: "Tourism & Visa",
    accentVar: "--tourism",
    description: "Places, routes, and the practical reality of global travel.",
  },
  {
    slug: "library",
    title: "Library",
    accentVar: "--gold",
    description: "Curated reading, references, and deep dives.",
  },
  {
    slug: "trends",
    title: "Events & Trends",
    accentVar: "--gold",
    description: "Signals that shape culture, economies, and attention.",
  },
  {
    slug: "empires",
    title: "Empires & Leaders",
    accentVar: "--empires",
    description: "Power, strategy, and the rise/fall cycles of history.",
  },
  {
    slug: "economies",
    title: "Economies",
    accentVar: "--gold",
    description: "Trade, policy, and the systems that produce prosperity—or chaos.",
  },
  {
    slug: "wars",
    title: "Wars",
    accentVar: "--wars",
    description: "Conflict, geopolitics, and the costs of power.",
  },
];

export type KnowledgeFrontmatter = {
  title: string;
  description?: string;
  category: KnowledgeCategory;
  publishedAt?: string;
  tags?: string[];
  readingMinutes?: number;
};

export type KnowledgeArticle = {
  category: KnowledgeCategory;
  slug: string;
  frontmatter: KnowledgeFrontmatter;
};

export type KnowledgeArticleFull = KnowledgeArticle & {
  html: string;
  raw: string;
};

function knowledgeRoot() {
  return path.join(process.cwd(), "content", "knowledge");
}

function isCategory(x: string): x is KnowledgeCategory {
  return (KNOWLEDGE_CATEGORIES as Array<{ slug: string }>).some(
    (c) => c.slug === x,
  );
}

export function getAllKnowledgeArticles(): KnowledgeArticle[] {
  const root = knowledgeRoot();
  if (!fs.existsSync(root)) return [];

  const cats = fs.readdirSync(root, { withFileTypes: true });
  const out: KnowledgeArticle[] = [];

  for (const catDir of cats) {
    if (!catDir.isDirectory()) continue;
    const categoryName = catDir.name;
    if (!isCategory(categoryName)) continue;
    const category: KnowledgeCategory = categoryName;

    const fullCat = path.join(root, category);
    const files = fs.readdirSync(fullCat, { withFileTypes: true });
    for (const f of files) {
      if (!f.isFile()) continue;
      if (!f.name.endsWith(".md")) continue;
      const slug = f.name.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(fullCat, f.name), "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as Partial<KnowledgeFrontmatter>;
      if (!fm.title) continue;
      out.push({
        category,
        slug,
        frontmatter: {
          title: fm.title,
          description: fm.description,
          category,
          publishedAt: fm.publishedAt,
          tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : undefined,
          readingMinutes:
            typeof fm.readingMinutes === "number" ? fm.readingMinutes : undefined,
        },
      });
    }
  }

  return out.sort((a, b) => {
    const da = a.frontmatter.publishedAt ?? "0000-00-00";
    const db = b.frontmatter.publishedAt ?? "0000-00-00";
    return db.localeCompare(da);
  });
}

export function getKnowledgeArticlesByCategory(
  category: KnowledgeCategory,
): KnowledgeArticle[] {
  return getAllKnowledgeArticles().filter((a) => a.category === category);
}

export function getKnowledgeArticleFull(params: {
  category: KnowledgeCategory;
  slug: string;
}): KnowledgeArticleFull | null {
  if (!params?.category || !params?.slug) return null;
  const fullPath = path.join(knowledgeRoot(), params.category, `${params.slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as Partial<KnowledgeFrontmatter>;
  if (!fm.title) return null;

  const html = marked.parse(parsed.content, { async: false }) as string;
  return {
    category: params.category,
    slug: params.slug,
    frontmatter: {
      title: fm.title,
      description: fm.description,
      category: params.category,
      publishedAt: fm.publishedAt,
      tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : undefined,
      readingMinutes:
        typeof fm.readingMinutes === "number" ? fm.readingMinutes : undefined,
    },
    html,
    raw,
  };
}

export function getCategoryMeta(category: KnowledgeCategory) {
  return KNOWLEDGE_CATEGORIES.find((c) => c.slug === category) ?? null;
}


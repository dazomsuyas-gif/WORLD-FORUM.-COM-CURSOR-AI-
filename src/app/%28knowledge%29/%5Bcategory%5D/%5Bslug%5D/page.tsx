import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  getAllKnowledgeArticles,
  getCategoryMeta,
  getKnowledgeArticleFull,
  type KnowledgeCategory,
} from "@/lib/knowledge";

export function generateStaticParams() {
  return getAllKnowledgeArticles().map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: KnowledgeCategory; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getKnowledgeArticleFull({ category, slug });
  if (!article) return {};
  return {
    title: `${article.frontmatter.title} — WORLD FORUM`,
    description: article.frontmatter.description,
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ category: KnowledgeCategory; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getKnowledgeArticleFull({ category, slug });
  if (!article) notFound();

  const meta = getCategoryMeta(category);

  return (
    <main className="bg-[var(--midnight)]">
      <Container className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Link href={`/${category}`} className="hover:text-white">
              {meta?.title ?? category}
            </Link>
            <span className="text-white/25">/</span>
            <span className="text-white/75">Article</span>
          </div>
          <Link
            href="/search"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Search
          </Link>
        </div>

        <article className="mt-10">
          <h1
            className="text-4xl tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.frontmatter.title}
          </h1>
          {article.frontmatter.description ? (
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
              {article.frontmatter.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            {article.frontmatter.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
            {typeof article.frontmatter.readingMinutes === "number" ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55">
                {article.frontmatter.readingMinutes} min read
              </span>
            ) : null}
          </div>

          <div className="mt-10 glass p-6 sm:p-8">
            <div
              className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--gold)] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-hr:border-white/10"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>
        </article>
      </Container>
    </main>
  );
}


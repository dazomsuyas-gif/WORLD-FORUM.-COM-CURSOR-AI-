import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  getCategoryMeta,
  getKnowledgeArticlesByCategory,
  KNOWLEDGE_CATEGORIES,
  type KnowledgeCategory,
} from "@/lib/knowledge";

export function generateStaticParams() {
  return KNOWLEDGE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ category: KnowledgeCategory }>;
}): Promise<Metadata> {
  return params.then(({ category }) => {
    const meta = getCategoryMeta(category);
    if (!meta) return {};
    return {
      title: `${meta.title} — WORLD FORUM`,
      description: meta.description,
    };
  });
}

export default async function KnowledgeCategoryPage({
  params,
}: {
  params: Promise<{ category: KnowledgeCategory }>;
}) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) notFound();

  const articles = getKnowledgeArticlesByCategory(category);

  return (
    <main className="bg-[var(--midnight)]">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div
            className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(${meta.accentVar}), transparent 60%)`,
            }}
          />
        </div>
        <Container className="relative py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/50">
                Knowledge Hub
              </div>
              <h1
                className="mt-3 text-4xl tracking-tight text-white sm:text-5xl"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {meta.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                {meta.description}
              </p>
            </div>
            <Link
              href="/search"
              className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10 sm:inline-flex"
            >
              Search
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {articles.length === 0 ? (
          <div className="glass p-8 text-sm text-white/70">
            No articles yet. Add markdown files under{" "}
            <span className="text-white/90">
              content/knowledge/{category}/
            </span>
            .
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.category}/${a.slug}`}
                className="glass block p-6 transition hover:border-white/20"
              >
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {a.category}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {a.frontmatter.title}
                </div>
                {a.frontmatter.description ? (
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {a.frontmatter.description}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.frontmatter.tags?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}


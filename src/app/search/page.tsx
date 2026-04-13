import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getAllKnowledgeArticles } from "@/lib/knowledge";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search — WORLD FORUM",
  description: "Search across World Forum articles and knowledge categories.",
};

export default function SearchPage() {
  const articles = getAllKnowledgeArticles();
  const index = articles.map((a) => ({
    title: a.frontmatter.title,
    description: a.frontmatter.description,
    category: a.category,
    slug: a.slug,
    tags: a.frontmatter.tags,
  }));

  return (
    <main className="bg-[var(--midnight)]">
      <Container className="py-14">
        <h1
          className="text-4xl tracking-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Search
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
          Find knowledge articles across categories. This is a fast MVP search;
          later we can upgrade to Algolia.
        </p>

        <SearchClient index={index} />
      </Container>
    </main>
  );
}


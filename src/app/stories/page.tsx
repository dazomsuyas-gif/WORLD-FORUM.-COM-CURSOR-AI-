import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Stories — WORLD FORUM",
  description: "Story World: long-form originals across romance, horror, life, and adventure.",
};

const featured = [
  { slug: "midnight-letters", title: "Midnight Letters", genre: "Romance" },
  { slug: "the-quiet-knock", title: "The Quiet Knock", genre: "Horror" },
] as const;

export default function StoriesPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Story World"
        title="Stories"
        description="Explore genres: relationships, horror, life, adventure. Next phase: chapter reader + cinematic effects."
      />
      <Container className="py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/stories/relationships"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Relationships
          </Link>
          <Link
            href="/stories/horror"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Horror
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={`/stories/${s.slug}`}
              className="glass block p-7 transition hover:border-white/20"
            >
              <div className="text-xs uppercase tracking-wider text-white/50">
                {s.genre}
              </div>
              <div
                className="mt-2 text-lg tracking-tight text-white"
                style={{ fontFamily: "var(--font-story)" }}
              >
                {s.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Story route placeholder. Next: cover art, chapters, and cinematic transitions.
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


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
        description="Phase MVP: hub + story routes. Next phase: chapter reader + genre effects."
      />
      <Container className="py-12">
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


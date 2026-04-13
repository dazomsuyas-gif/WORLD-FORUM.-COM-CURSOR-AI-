import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Relationship Stories — WORLD FORUM",
  description: "Relationship and romance stories collection (MVP).",
};

const stories = [
  {
    slug: "midnight-letters",
    title: "Midnight Letters",
    hook: "Two strangers, one mailbox, and messages that arrive after midnight.",
  },
  {
    slug: "the-last-seat",
    title: "The Last Seat",
    hook: "A crowded bus, a shared silence, and a choice that changes everything.",
  },
] as const;

export default function RelationshipStoriesPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Story World"
        title="Relationships"
        description="Romance, life, and the complicated truth between people. Next: chapters + reader."
        right={
          <Link
            href="/stories"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All stories
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((s) => (
            <Link
              key={s.slug}
              href={`/stories/${s.slug}`}
              className="glass block p-7 transition hover:border-white/20"
            >
              <div
                className="text-lg tracking-tight text-white"
                style={{ fontFamily: "var(--font-story)" }}
              >
                {s.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{s.hook}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


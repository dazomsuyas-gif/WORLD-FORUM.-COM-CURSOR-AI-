import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Horror Stories — WORLD FORUM",
  description: "Horror stories collection (MVP).",
};

const stories = [
  {
    slug: "the-quiet-knock",
    title: "The Quiet Knock",
    hook: "A sound at the door that only happens when you’re alone.",
  },
  {
    slug: "red-room",
    title: "Red Room",
    hook: "A live stream you can’t close—and a countdown you can’t stop.",
  },
] as const;

export default function HorrorStoriesPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Story World"
        title="Horror"
        description="Flicker, fog, and dread. Next phase adds genre VFX + chapter reader."
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


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

const stories = [
  { slug: "midnight-letters", title: "Midnight Letters", genre: "Romance" },
  { slug: "the-quiet-knock", title: "The Quiet Knock", genre: "Horror" },
  { slug: "red-room", title: "Red Room", genre: "Horror" },
  { slug: "the-last-seat", title: "The Last Seat", genre: "Relationships" },
] as const;

type StorySlug = (typeof stories)[number]["slug"];

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: StorySlug }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = stories.find((s) => s.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Stories — WORLD FORUM`,
    description: `A ${meta.genre.toLowerCase()} story in the World Forum Story World.`,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: StorySlug }>;
}) {
  const { slug } = await params;
  const meta = stories.find((s) => s.slug === slug);
  if (!meta) notFound();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow={`Story World · ${meta.genre}`}
        title={meta.title}
        description="Placeholder story page. Next: chapters, reader UI, progress bar, and genre VFX."
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
        <div className="glass p-8 text-sm leading-7 text-white/75">
          This is a route skeleton for <span className="text-white">{meta.title}</span>.
          In the next phase we’ll add chapters (`/stories/[slug]/chapter/[n]`), a
          reader component, and genre-specific visuals (fog, hearts, flicker, etc.).
        </div>
      </Container>
    </main>
  );
}


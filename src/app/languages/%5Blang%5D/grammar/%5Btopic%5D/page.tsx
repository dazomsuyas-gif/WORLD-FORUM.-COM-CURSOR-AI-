import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  SUPPORTED_LANGUAGES,
  GRAMMAR_TOPICS,
  type GrammarTopic,
  type LanguageSlug,
} from "@/lib/languageAcademy";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    GRAMMAR_TOPICS.map((t) => ({ lang: l.slug, topic: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: GrammarTopic }>;
}): Promise<Metadata> {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = GRAMMAR_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) return {};
  return {
    title: `${meta.name} Grammar — ${t.title} — WORLD FORUM`,
    description: `Grammar topic: ${t.title} (${meta.name}).`,
  };
}

const CONTENT: Record<GrammarTopic, { bullets: string[] }> = {
  "sentence-basics": {
    bullets: [
      "Word order: subject → verb → object (common pattern).",
      "Simple statements vs. negatives.",
      "Polite forms and basic connectors.",
    ],
  },
  questions: {
    bullets: [
      "Yes/no questions vs. information questions (who/what/where/when/why/how).",
      "Rising intonation (varies by language).",
      "Short answers and clarity.",
    ],
  },
  "past-present-future": {
    bullets: [
      "Present for habits and facts.",
      "Past for finished actions.",
      "Future plans: will/going to (language-dependent).",
    ],
  },
};

export default async function GrammarTopicPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: GrammarTopic }>;
}) {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = GRAMMAR_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) notFound();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy · Grammar"
        title={`${meta.name}: ${t.title}`}
        description="MVP content outline. Next: animated diagrams + drills per CEFR level."
        right={
          <Link
            href={`/languages/${lang}/grammar`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All topics
          </Link>
        }
      />
      <Container className="py-12">
        <div className="glass p-8">
          <div className="text-xs uppercase tracking-wider text-white/50">
            Key points
          </div>
          <ul className="mt-5 grid gap-2 text-sm text-white/75">
            {CONTENT[topic].bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-[var(--gold)]">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xs text-white/45">
            Next: interactive exercises, examples, and a lesson map.
          </div>
        </div>
      </Container>
    </main>
  );
}


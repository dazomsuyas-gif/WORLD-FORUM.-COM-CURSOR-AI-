import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  SUPPORTED_LANGUAGES,
  VOCAB_TOPICS,
  type LanguageSlug,
  type VocabTopic,
} from "@/lib/languageAcademy";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    VOCAB_TOPICS.map((t) => ({ lang: l.slug, topic: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: VocabTopic }>;
}): Promise<Metadata> {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = VOCAB_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) return {};
  return {
    title: `${meta.name} Vocabulary — ${t.title} — WORLD FORUM`,
    description: `Vocabulary topic: ${t.title} (${meta.name}).`,
  };
}

const SAMPLE = {
  "phones-and-accessories": [
    { term: "phone", meaning: "a mobile device" },
    { term: "charger", meaning: "used to charge a device" },
    { term: "screen protector", meaning: "protective glass/film for a screen" },
  ],
  "fashion-and-style": [
    { term: "shirt", meaning: "a top" },
    { term: "shoes", meaning: "footwear" },
    { term: "style", meaning: "fashion look" },
  ],
  "food-and-market": [
    { term: "eggs", meaning: "food from chickens" },
    { term: "rice", meaning: "a staple grain" },
    { term: "cooking oil", meaning: "oil used for cooking" },
  ],
  "travel-and-visa": [
    { term: "passport", meaning: "travel document" },
    { term: "visa", meaning: "permission to enter a country" },
    { term: "embassy", meaning: "official foreign office" },
  ],
  "daily-life": [
    { term: "hello", meaning: "a greeting" },
    { term: "please", meaning: "polite request" },
    { term: "thank you", meaning: "gratitude" },
  ],
} satisfies Record<VocabTopic, Array<{ term: string; meaning: string }>>;

export default async function VocabTopicPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: VocabTopic }>;
}) {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = VOCAB_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) notFound();

  const items = SAMPLE[topic];

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy · Vocabulary"
        title={`${meta.name}: ${t.title}`}
        description="MVP flashcards with placeholders. Next: audio + spaced repetition + images."
        right={
          <Link
            href={`/languages/${lang}/vocabulary`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All topics
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.term} className="glass p-6">
              <div className="text-base font-semibold text-white/90">
                {it.term}
              </div>
              <div className="mt-2 text-sm text-white/70">{it.meaning}</div>
              <div className="mt-4 text-xs text-white/45">
                Audio & images coming next.
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}


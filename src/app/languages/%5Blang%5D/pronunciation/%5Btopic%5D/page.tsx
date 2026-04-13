import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { AudioPractice } from "@/components/languages/AudioPractice";
import {
  SUPPORTED_LANGUAGES,
  PRONUNCIATION_TOPICS,
  type LanguageSlug,
  type PronunciationTopic,
} from "@/lib/languageAcademy";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    PRONUNCIATION_TOPICS.map((t) => ({ lang: l.slug, topic: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: PronunciationTopic }>;
}): Promise<Metadata> {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = PRONUNCIATION_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) return {};
  return {
    title: `${meta.name} Pronunciation — ${t.title} — WORLD FORUM`,
    description: `Pronunciation topic: ${t.title} (${meta.name}).`,
  };
}

export default async function PronunciationTopicPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: PronunciationTopic }>;
}) {
  const { lang, topic } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = PRONUNCIATION_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) notFound();

  const sample =
    topic === "vowels"
      ? "Repeat: a e i o u"
      : topic === "consonants"
        ? "Repeat: b p t d k g"
        : "Repeat: This is a simple sentence.";

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy · Pronunciation"
        title={`${meta.name}: ${t.title}`}
        description="Audio MVP: play a sample and record yourself for practice."
        right={
          <Link
            href={`/languages/${lang}/pronunciation`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All topics
          </Link>
        }
      />
      <Container className="py-12">
        <AudioPractice sampleText={sample} />
      </Container>
    </main>
  );
}


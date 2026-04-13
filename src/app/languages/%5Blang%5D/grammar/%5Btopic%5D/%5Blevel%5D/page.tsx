import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  GRAMMAR_TOPICS,
  SUPPORTED_LANGUAGES,
  getGrammarDrill,
  getLanguageName,
  type CefrLevel,
  type GrammarTopic,
  type LanguageSlug,
} from "@/lib/languageAcademy";
import { ExerciseRunner } from "@/components/languages/ExerciseRunner";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    GRAMMAR_TOPICS.flatMap((t) =>
      LEVELS.map((level) => ({ lang: l.slug, topic: t.slug, level })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: GrammarTopic; level: CefrLevel }>;
}): Promise<Metadata> {
  const { lang, topic, level } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = GRAMMAR_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) return {};
  return {
    title: `${meta.name} Grammar — ${t.title} ${level} — WORLD FORUM`,
    description: `Interactive grammar drills for ${meta.name}: ${t.title} (${level}).`,
  };
}

export default async function GrammarDrillLevelPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; topic: GrammarTopic; level: CefrLevel }>;
}) {
  const { lang, topic, level } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  const t = GRAMMAR_TOPICS.find((x) => x.slug === topic);
  if (!meta || !t) notFound();

  const drill = getGrammarDrill({ lang, topic, level });
  const lessonKey = drill.id;

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy · Grammar Drills"
        title={`${getLanguageName(lang)} — ${t.title} (${level})`}
        description="Interactive drills. XP/streak is local-first; later we sync to your account."
        right={
          <Link
            href={`/languages/${lang}/grammar/${topic}`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Topic overview
          </Link>
        }
      />
      <Container className="py-12">
        <ExerciseRunner
          lessonKey={lessonKey}
          lesson={{
            id: drill.id,
            title: drill.title,
            exercises: drill.exercises,
          }}
        />
      </Container>
    </main>
  );
}


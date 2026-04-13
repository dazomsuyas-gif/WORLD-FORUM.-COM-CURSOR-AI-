import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getLanguageName,
  getLesson,
  getUnit,
  SUPPORTED_LANGUAGES,
  type CefrLevel,
  type LanguageSlug,
} from "@/lib/languageAcademy";
import { ExerciseRunner } from "@/components/languages/ExerciseRunner";

export function generateStaticParams() {
  const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const params: Array<{
    lang: LanguageSlug;
    level: CefrLevel;
    unit: string;
    lesson: string;
  }> = [];

  for (const l of SUPPORTED_LANGUAGES) {
    for (const level of levels) {
      const unit = getUnit(l.slug, level, "1");
      if (!unit) continue;
      for (const ls of unit.lessons) {
        params.push({ lang: l.slug, level, unit: unit.id, lesson: ls.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; level: CefrLevel; unit: string; lesson: string }>;
}): Promise<Metadata> {
  const { lang, level, unit, lesson } = await params;
  const ls = getLesson(lang, level, unit, lesson);
  if (!ls) return {};
  return {
    title: `${getLanguageName(lang)} ${level} — ${ls.title} — WORLD FORUM`,
    description: ls.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; level: CefrLevel; unit: string; lesson: string }>;
}) {
  const { lang, level, unit, lesson } = await params;
  const langMeta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  if (!langMeta) notFound();

  const u = getUnit(lang, level, unit);
  const ls = getLesson(lang, level, unit, lesson);
  if (!u || !ls) notFound();

  const lessonKey = `${lang}:${level}:${unit}:${lesson}`;

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow={`Language Academy · ${langMeta.name} · ${level}`}
        title={ls.title}
        description={ls.summary ?? "Lesson"}
        right={
          <Link
            href={`/languages/${lang}/${level}`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Back to level
          </Link>
        }
      />
      <Container className="py-12">
        <div className="mb-6 text-xs uppercase tracking-wider text-white/50">
          {u.title}
        </div>
        <ExerciseRunner lessonKey={lessonKey} lesson={ls} />
      </Container>
    </main>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  SUPPORTED_LANGUAGES,
  VOCAB_TOPICS,
  type LanguageSlug,
} from "@/lib/languageAcademy";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((l) => ({ lang: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  if (!meta) return {};
  return {
    title: `${meta.name} Vocabulary — WORLD FORUM`,
    description: `Vocabulary topics for ${meta.name}.`,
  };
}

export default async function VocabIndexPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug }>;
}) {
  const { lang } = await params;
  const meta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  if (!meta) notFound();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy · Vocabulary"
        title={`${meta.name} Vocabulary`}
        description="Choose a topic. Next phase will add audio + spaced repetition."
        right={
          <Link
            href={`/languages/${lang}`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Back
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {VOCAB_TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/languages/${lang}/vocabulary/${t.slug}`}
              className="glass block p-7 transition hover:border-white/20"
            >
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Flashcards and examples (MVP).
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


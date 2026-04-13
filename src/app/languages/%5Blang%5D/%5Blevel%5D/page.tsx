import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  SUPPORTED_LANGUAGES,
  getLanguageName,
  getLevelPlan,
  type CefrLevel,
  type LanguageSlug,
} from "@/lib/languageAcademy";

export function generateStaticParams() {
  const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  return SUPPORTED_LANGUAGES.flatMap((l) =>
    levels.map((level) => ({ lang: l.slug, level })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; level: CefrLevel }>;
}): Promise<Metadata> {
  const { lang, level } = await params;
  return {
    title: `${getLanguageName(lang)} ${level} — Language Academy — WORLD FORUM`,
    description: `Units and lessons for ${getLanguageName(lang)} ${level}.`,
  };
}

export default async function LanguageLevelPage({
  params,
}: {
  params: Promise<{ lang: LanguageSlug; level: CefrLevel }>;
}) {
  const { lang, level } = await params;
  const langMeta = SUPPORTED_LANGUAGES.find((x) => x.slug === lang);
  if (!langMeta) notFound();

  const plan = getLevelPlan(lang, level);
  if (!plan) notFound();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy"
        title={`${langMeta.name} — ${level}`}
        description="Units → lessons → exercises. MVP uses local progress; later we sync to your account."
        right={
          <Link
            href={`/languages/${lang}`}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Back to language
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {plan.units.map((u) => (
            <div key={u.id} className="glass p-7">
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {u.title}
              </div>
              <div className="mt-4 grid gap-3">
                {u.lessons.map((ls) => (
                  <Link
                    key={ls.id}
                    href={`/languages/${lang}/${level}/unit/${u.id}/lesson/${ls.id}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="font-semibold text-white/90">{ls.title}</div>
                    {ls.summary ? (
                      <div className="mt-1 text-xs text-white/55">{ls.summary}</div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}


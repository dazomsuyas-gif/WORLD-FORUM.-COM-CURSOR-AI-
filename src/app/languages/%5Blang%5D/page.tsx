import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import type { CefrLevel } from "@/lib/languageAcademy";

const supported = [
  { slug: "english", name: "English" },
  { slug: "chinese", name: "Chinese" },
  { slug: "spanish", name: "Spanish" },
  { slug: "french", name: "French" },
  { slug: "german", name: "German" },
  { slug: "swahili", name: "Swahili" },
] as const;

type LangSlug = (typeof supported)[number]["slug"];

export function generateStaticParams() {
  return supported.map((l) => ({ lang: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LangSlug }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = supported.find((x) => x.slug === lang);
  if (!meta) return {};
  return {
    title: `${meta.name} — Language Academy — WORLD FORUM`,
    description: `Learn ${meta.name} with CEFR A1–C2 structure.`,
  };
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: LangSlug }>;
}) {
  const { lang } = await params;
  const meta = supported.find((x) => x.slug === lang);
  if (!meta) notFound();

  const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy"
        title={meta.name}
        description="Choose a level to start. Each level contains units, lessons, and interactive exercises."
        right={
          <Link
            href="/languages"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All languages
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {levels.map((lvl) => (
            <Link
              key={lvl}
              href={`/languages/${lang}/${lvl}`}
              className="glass block p-6 transition hover:border-white/20"
            >
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lvl}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Open level overview → units → lessons.
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


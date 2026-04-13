import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Languages — WORLD FORUM",
  description: "Language Academy hub: CEFR A1–C2 across multiple languages.",
};

const langs = [
  { slug: "english", name: "English" },
  { slug: "chinese", name: "Chinese" },
  { slug: "spanish", name: "Spanish" },
  { slug: "french", name: "French" },
  { slug: "german", name: "German" },
  { slug: "swahili", name: "Swahili" },
] as const;

export default function LanguagesPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Language Academy"
        title="Languages"
        description="Phase MVP: hub + routes. Next phase: CEFR structure, exercises, XP, audio."
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {langs.map((l) => (
            <Link
              key={l.slug}
              href={`/languages/${l.slug}`}
              className="glass block p-7 transition hover:border-white/20"
            >
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l.name}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                CEFR A1 → C2 • Lessons • Vocabulary • Grammar • Pronunciation
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


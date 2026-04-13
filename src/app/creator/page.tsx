import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllScripts } from "@/lib/creator";

export const metadata: Metadata = {
  title: "Creator Hub — WORLD FORUM",
  description: "Creator scripts, templates, and content tools (MVP).",
};

export default function CreatorHubPage() {
  const scripts = getAllScripts();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Content Creator Hub"
        title="Creator Hub"
        description="Scripts and templates for creators. Next: 100+ scripts, categories, and admin editor."
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {scripts.map((s) => (
            <Link
              key={s.slug}
              href={`/creator/scripts/${s.slug}`}
              className="glass block p-7 transition hover:border-white/20"
            >
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </div>
              {s.description ? (
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {s.description}
                </p>
              ) : null}
              {typeof s.readingMinutes === "number" ? (
                <div className="mt-4 text-xs text-white/45">
                  {s.readingMinutes} min read
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}


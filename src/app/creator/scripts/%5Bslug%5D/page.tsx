import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllScripts, getScriptFull } from "@/lib/creator";

export function generateStaticParams() {
  return getAllScripts().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getScriptFull(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Creator Hub — WORLD FORUM`,
    description: s.description,
  };
}

export default async function CreatorScriptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getScriptFull(slug);
  if (!s) notFound();

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Creator Hub · Script"
        title={s.title}
        description={s.description}
        right={
          <Link
            href="/creator"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            All scripts
          </Link>
        }
      />
      <Container className="py-12">
        <div className="glass p-6 sm:p-8">
          <div
            className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--gold)] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-hr:border-white/10"
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        </div>
      </Container>
    </main>
  );
}


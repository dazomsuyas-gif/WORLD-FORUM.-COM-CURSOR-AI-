import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Admin — WORLD FORUM",
  description: "Admin panel shell (auth + roles coming next).",
};

export default function AdminPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Admin Panel"
        title="Dashboard"
        description="Shell only: Next phase adds auth/roles, content editor, and moderation tools."
        right={
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Back to site
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Content",
              desc: "Articles, scripts, stories, languages (CMS coming).",
            },
            {
              title: "Community",
              desc: "Reports, moderation, user roles (coming).",
            },
            {
              title: "Payments",
              desc: "Transactions, payouts, revenue charts (coming).",
            },
          ].map((c) => (
            <div key={c.title} className="glass p-7">
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass p-7 text-sm text-white/70">
          Access control is intentionally not implemented yet. Next phase will
          protect <span className="text-white/90">/admin</span> using sessions +
          roles (admin/super_admin).
        </div>
      </Container>
    </main>
  );
}


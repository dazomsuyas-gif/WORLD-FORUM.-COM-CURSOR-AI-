import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Register — WORLD FORUM",
  description: "Create your WORLD FORUM account.",
};

export default function RegisterPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Account" title="Register" />
      <Container className="py-12">
        <div className="mx-auto max-w-lg glass p-8">
          <div className="text-sm text-white/70">
            Registration will be added in a later phase (NextAuth + database).
          </div>
          <div className="mt-6 flex gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
            >
              I already have an account
            </Link>
            <Link
              href="/"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
              style={{ background: "var(--grad-gold)" }}
            >
              Back home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}


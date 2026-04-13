import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Visa Assistance — WORLD FORUM",
  description: "Visa assistance checklist and guidance (MVP).",
};

export default function VisaAssistancePage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Tourism & Visa"
        title="Visa Assistance"
        description="MVP guidance. Next phases will add country-specific requirements and AI assistance."
        right={
          <Link
            href="/tourism"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Back to tourism
          </Link>
        }
      />
      <Container className="py-12">
        <div className="glass p-8">
          <div className="text-xs uppercase tracking-wider text-white/50">
            Quick checklist (generic)
          </div>
          <ul className="mt-5 grid gap-2 text-sm text-white/75">
            {[
              "Valid passport (6+ months validity)",
              "Visa application form + photo requirements",
              "Travel itinerary + accommodation proof",
              "Return ticket or onward travel evidence",
              "Bank statement / sponsor letter (if required)",
              "Travel insurance (if required)",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-[var(--gold)]">•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xs text-white/45">
            This is informational and not legal advice. Country rules change
            often; always confirm with official sources.
          </div>
        </div>
      </Container>
    </main>
  );
}


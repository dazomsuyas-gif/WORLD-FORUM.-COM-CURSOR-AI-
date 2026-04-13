import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Tourism & Visa — WORLD FORUM",
  description:
    "Tourism guidance, destination discovery, and visa assistance (MVP shell).",
};

export default function TourismPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Tourism & Visa"
        title="Tourism"
        description="Explore destinations, travel planning, and visa help. Next phase adds country pages and tools."
        right={
          <Link
            href="/tourism/visa-assistance"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Visa assistance
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Destinations",
              desc: "Country and city discovery pages (coming).",
            },
            {
              title: "Visa guidance",
              desc: "Document checklists, timelines, and common mistakes.",
            },
            {
              title: "Travel tools",
              desc: "Later: itinerary builder, cost estimator, and safety tips.",
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
      </Container>
    </main>
  );
}


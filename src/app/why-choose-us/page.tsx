import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Why Choose Us — WORLD FORUM",
  description:
    "A premium, cinematic platform: performance-first, scalable architecture, and world-class UX.",
};

const features = [
  {
    title: "Cinematic UI",
    desc: "Morphing gradients, glass depth, premium typography, and micro-interactions everywhere.",
  },
  {
    title: "Knowledge at Scale",
    desc: "Category system + markdown-backed articles now, CMS-ready later without rewrites.",
  },
  {
    title: "Search",
    desc: "Fast MVP search today. Upgrade path to Algolia when content volume grows.",
  },
  {
    title: "Modular roadmap",
    desc: "Languages, Stories, Community, Marketplace, Payments, Admin—built as separate modules.",
  },
  {
    title: "Performance targets",
    desc: "Design discipline and code splitting from day one to keep Lighthouse scores high.",
  },
] as const;

export default function WhyChooseUsPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="WORLD FORUM"
        title="Why Choose Us"
        description="A production-grade foundation built for cinematic visuals and real scale."
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="glass p-7">
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}


import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About — WORLD FORUM",
  description:
    "WORLD FORUM is a cinematic global platform for knowledge, languages, stories, community, and commerce.",
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="WORLD FORUM"
        title="About"
        description="A cinematic knowledge and lifestyle platform built to scale."
      />
      <Container className="py-12">
        <div className="glass p-8 text-sm leading-7 text-white/75">
          This page is the Phase 1–5 foundation. Next we’ll expand content
          sections, language academy, stories, community, marketplace, payments,
          and admin—without breaking the build.
        </div>
      </Container>
    </main>
  );
}


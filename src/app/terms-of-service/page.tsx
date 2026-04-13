import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Service — WORLD FORUM",
  description: "Terms of service placeholder for WORLD FORUM.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <Container className="py-12">
        <div className="glass p-8 text-sm leading-7 text-white/75">
          This is a placeholder terms page. We’ll expand terms when community,
          marketplace, and payment flows are enabled.
        </div>
      </Container>
    </main>
  );
}


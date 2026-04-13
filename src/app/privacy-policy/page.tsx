import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy — WORLD FORUM",
  description: "Privacy policy placeholder for WORLD FORUM.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Container className="py-12">
        <div className="glass p-8 text-sm leading-7 text-white/75">
          This is a placeholder privacy policy page. We’ll replace it with a
          full policy once authentication, analytics, payments, and messaging
          are enabled.
        </div>
      </Container>
    </main>
  );
}


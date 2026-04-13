import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SellForm } from "./sellForm";

export const metadata: Metadata = {
  title: "Sell — Marketplace — WORLD FORUM",
  description: "Post your product for sale (MVP).",
};

export default function SellPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Marketplace"
        title="Sell a product"
        description="MVP seller posting. Next: seller profiles, verification, payouts, shipping."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl glass p-8">
          <SellForm />
        </div>
      </Container>
    </main>
  );
}


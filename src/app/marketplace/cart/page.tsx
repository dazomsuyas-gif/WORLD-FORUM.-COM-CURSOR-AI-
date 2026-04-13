import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Cart — Marketplace — WORLD FORUM",
  description: "Your World Forum marketplace cart (placeholder).",
};

export default function MarketplaceCartPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Marketplace" title="Cart" />
      <Container className="py-12">
        <div className="glass p-8">
          <p className="text-sm text-white/70">
            Cart functionality ships in the Marketplace phase. This route exists
            now so navigation is clean.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/marketplace"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
            >
              Back to marketplace
            </Link>
            <Link
              href="/marketplace/checkout"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
              style={{ background: "var(--grad-gold)" }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}


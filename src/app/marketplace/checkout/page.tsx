import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Checkout — Marketplace — WORLD FORUM",
  description: "Checkout placeholder. Payments will be integrated in a later phase.",
};

export default function MarketplaceCheckoutPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Marketplace" title="Checkout" />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Payment methods
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              This is a placeholder checkout page. Next phases will integrate:
              cards, PayPal, mobile money, bank cards, and crypto.
            </p>
          </div>
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Order summary
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Cart + pricing + shipping will be wired when the product model and
              data layer are introduced.
            </p>
            <div className="mt-6">
              <Link
                href="/marketplace/cart"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
              >
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


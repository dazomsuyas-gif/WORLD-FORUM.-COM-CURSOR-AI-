import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Marketplace — WORLD FORUM",
  description: "Marketplace hub: products, sellers, cart, checkout (coming soon).",
};

export default function MarketplacePage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Marketplace"
        title="Marketplace"
        description="Browse products, predict prices from international baselines, and sell your own items."
        right={
          <Link
            href="/marketplace/cart"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Cart
          </Link>
        }
      />
      <Container className="py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/marketplace/products"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
            style={{ background: "var(--grad-gold)" }}
          >
            Browse products
          </Link>
          <Link
            href="/marketplace/sell"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Sell a product
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Products",
              desc: "Browse local cultural goods and digital products.",
            },
            {
              title: "AI Price Prediction",
              desc: "MVP predictor is live. Next: market APIs + live FX + brand pricing.",
            },
            {
              title: "Checkout",
              desc: "Later: cards, mobile money, banks, crypto, and more.",
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


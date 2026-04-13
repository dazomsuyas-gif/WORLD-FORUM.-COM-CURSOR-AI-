import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  MARKETPLACE_PRODUCTS,
  convertUsdToTzs,
  predictPriceUsd,
} from "@/lib/marketplace";

export async function generateStaticParams() {
  return MARKETPLACE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = MARKETPLACE_PRODUCTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Marketplace — WORLD FORUM`,
    description: `International baseline + predicted price for ${p.title}.`,
  };
}

export default async function MarketplaceProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = MARKETPLACE_PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const predUsd = predictPriceUsd(p);
  const predTzs = convertUsdToTzs(predUsd);

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow={`Marketplace · ${p.category}`}
        title={p.title}
        description="MVP product page. Next: variants, inventory, reviews, seller profiles, and checkout."
        right={
          <Link
            href="/marketplace/cart"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            View cart
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Price prediction
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/75">
              <div>
                International baseline:{" "}
                <span className="text-white/90">
                  ${p.baseInternationalUsd.toFixed(2)}
                </span>
              </div>
              <div>
                Predicted local:{" "}
                <span className="text-white/90">${predUsd.toFixed(2)}</span>{" "}
                <span className="text-white/40">(~ TZS {predTzs.toFixed(0)})</span>
              </div>
              {typeof p.sellerUsd === "number" ? (
                <div>
                  Seller price:{" "}
                  <span className="text-white/90">${p.sellerUsd.toFixed(2)}</span>
                </div>
              ) : null}
            </div>
            <div className="mt-6 text-xs text-white/45">
              This predictor is an MVP using fixed multipliers + a fixed FX
              rate. Next phase connects to international price APIs and live FX.
            </div>
          </div>

          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Actions
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
                style={{ background: "var(--grad-gold)" }}
              >
                Add to cart
              </button>
              <Link
                href="/marketplace/products"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
              >
                Back to products
              </Link>
            </div>
            <div className="mt-6 text-sm text-white/70">
              Seller posting is available at{" "}
              <Link className="text-[var(--gold)] hover:underline" href="/marketplace/sell">
                /marketplace/sell
              </Link>
              .
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}


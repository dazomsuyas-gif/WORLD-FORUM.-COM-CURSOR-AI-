import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  MARKETPLACE_PRODUCTS,
  convertUsdToTzs,
  predictPriceUsd,
} from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Products — Marketplace — WORLD FORUM",
  description: "Browse products across electronics, fashion, and food.",
};

export default function MarketplaceProductsPage() {
  const products = MARKETPLACE_PRODUCTS;

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Marketplace"
        title="Products"
        description="MVP catalog with international baselines + predicted local price. Next: live market APIs."
        right={
          <Link
            href="/marketplace/sell"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
            style={{ background: "var(--grad-gold)" }}
          >
            Sell a product
          </Link>
        }
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => {
            const predUsd = predictPriceUsd(p);
            const predTzs = convertUsdToTzs(predUsd);
            return (
              <Link
                key={p.id}
                href={`/marketplace/products/${p.slug}`}
                className="glass block p-7 transition hover:border-white/20"
              >
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {p.category}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {p.title}
                </div>
                <div className="mt-3 grid gap-1 text-sm text-white/70">
                  <div>
                    International baseline:{" "}
                    <span className="text-white/90">
                      ${p.baseInternationalUsd.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    Predicted local:{" "}
                    <span className="text-white/90">
                      ${predUsd.toFixed(2)}
                    </span>{" "}
                    <span className="text-white/40">(~ TZS {predTzs.toFixed(0)})</span>
                  </div>
                  {typeof p.sellerUsd === "number" ? (
                    <div>
                      Seller price:{" "}
                      <span className="text-white/90">
                        ${p.sellerUsd.toFixed(2)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}


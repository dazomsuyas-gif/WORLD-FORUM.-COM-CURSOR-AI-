import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import clientPromise, { requireMongoClientPromise } from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "Admin Products — WORLD FORUM",
  description: "Review seller-submitted marketplace products (MVP).",
};

export default async function AdminMarketplaceProductsPage() {
  const hasDb = Boolean(clientPromise);
  const products = hasDb
    ? await (async () => {
        const client = await requireMongoClientPromise();
        const db = client.db();
        return db
          .collection("marketplace_products")
          .find({})
          .sort({ createdAt: -1 })
          .limit(200)
          .toArray();
      })()
    : [];

  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Admin Panel"
        title="Marketplace Products"
        description="MVP review list. Next: approve/reject, seller profiles, and audit logs."
        right={
          <Link
            href="/admin"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Admin dashboard
          </Link>
        }
      />
      <Container className="py-12">
        {!hasDb ? (
          <div className="glass p-7 text-sm text-white/70">
            Configure <span className="text-white/90">MONGODB_URI</span> to view
            seller submissions.
          </div>
        ) : products.length === 0 ? (
          <div className="glass p-7 text-sm text-white/70">
            No seller products yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((p: any) => (
              <div key={p.id} className="glass p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                  <div className="text-xs text-white/55">
                    status: <span className="text-white/80">{p.status}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-white/70">
                  category: <span className="text-white/85">{p.category}</span> ·
                  baseline:{" "}
                  <span className="text-white/85">${Number(p.baseInternationalUsd).toFixed(2)}</span>
                  {typeof p.sellerUsd === "number" ? (
                    <>
                      {" "}
                      · seller:{" "}
                      <span className="text-white/85">${Number(p.sellerUsd).toFixed(2)}</span>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}


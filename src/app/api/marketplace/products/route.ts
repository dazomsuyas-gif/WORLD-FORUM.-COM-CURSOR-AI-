import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { SellerProductInputSchema } from "@/lib/marketplace";
import { requireMongoClientPromise } from "@/lib/mongodb";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ ok: true, products: [] });
  }
  const client = await requireMongoClientPromise();
  const db = client.db();
  const products = await db
    .collection("marketplace_products")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { ok: false, error: "Server not configured (missing MONGODB_URI)." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = SellerProductInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid product input." },
      { status: 400 },
    );
  }

  const client = await requireMongoClientPromise();
  const db = client.db();

  const doc = {
    id: nanoid(),
    ...parsed.data,
    status: "pending" as const,
    createdAt: new Date(),
  };

  await db.collection("marketplace_products").insertOne(doc);

  // Best-effort notification hook (WhatsApp/admin bot stub).
  fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/admin/notify`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      type: "seller_product_posted",
      title: doc.title,
      category: doc.category,
      sellerUsd: doc.sellerUsd,
    }),
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: doc.id });
}


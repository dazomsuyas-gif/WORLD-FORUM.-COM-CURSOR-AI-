import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

  // MVP: if WhatsApp env is not configured, we still succeed (no-op),
  // so seller posting doesn't break the site.
  if (!token || !phoneNumberId || !adminNumber) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const text =
    payload?.type === "seller_product_posted"
      ? `New seller product pending:\n- ${payload.title}\n- ${payload.category}\n- sellerUsd: ${payload.sellerUsd ?? "n/a"}`
      : `Admin notification:\n${JSON.stringify(payload)}`;

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: adminNumber,
      type: "text",
      text: { body: text },
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}


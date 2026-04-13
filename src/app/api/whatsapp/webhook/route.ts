import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token && expected && token === expected) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST() {
  // Placeholder: In later phases we’ll parse messages and call an AI provider
  // (Claude/OpenAI) + route users to relevant worldforum pages.
  return NextResponse.json({ ok: true });
}


import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/users";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  name: z.string().min(1).max(60).optional(),
});

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { ok: false, error: "Server not configured (missing MONGODB_URI)." },
      { status: 503 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input." },
      { status: 400 },
    );
  }

  try {
    const user = await createUser(parsed.data);
    return NextResponse.json({ ok: true, userId: String(user._id) });
  } catch (e: any) {
    const msg = typeof e?.message === "string" ? e.message : "";
    if (msg.includes("E11000")) {
      return NextResponse.json(
        { ok: false, error: "Email already registered." },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}


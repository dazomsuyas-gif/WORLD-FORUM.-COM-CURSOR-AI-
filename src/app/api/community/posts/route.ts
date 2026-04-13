import { NextResponse } from "next/server";
import { CreatePostSchema, createPost, listPosts } from "@/lib/community";
import { broadcast } from "@/app/api/community/stream/route";

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CreatePostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid post." }, { status: 400 });
  }
  const post = await createPost(parsed.data.text);
  broadcast("post", post);
  return NextResponse.json({ ok: true, post });
}


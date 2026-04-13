import { z } from "zod";
import { nanoid } from "nanoid";
import clientPromise, { requireMongoClientPromise } from "@/lib/mongodb";

export const CreatePostSchema = z.object({
  text: z.string().min(1).max(500),
});

export type Post = {
  id: string;
  text: string;
  createdAt: string; // ISO
};

declare global {
  // eslint-disable-next-line no-var
  var __wfPosts: Post[] | undefined;
}

function memPosts() {
  if (!global.__wfPosts) global.__wfPosts = [];
  return global.__wfPosts;
}

export async function listPosts(): Promise<Post[]> {
  if (!clientPromise) return memPosts().slice().reverse();
  const client = await requireMongoClientPromise();
  const db = client.db();
  const docs = await db
    .collection("community_posts")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map((d: any) => ({
    id: d.id,
    text: d.text,
    createdAt: d.createdAt,
  }));
}

export async function createPost(text: string): Promise<Post> {
  const post: Post = { id: nanoid(), text, createdAt: new Date().toISOString() };
  if (!clientPromise) {
    memPosts().push(post);
    return post;
  }
  const client = await requireMongoClientPromise();
  const db = client.db();
  await db.collection("community_posts").insertOne(post as any);
  return post;
}


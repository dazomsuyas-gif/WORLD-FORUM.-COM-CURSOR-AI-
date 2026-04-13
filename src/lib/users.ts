import clientPromise, { requireMongoClientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export type UserRole = "user" | "admin" | "super_admin";

export type DbUser = {
  _id: ObjectId;
  email: string;
  name?: string;
  role: UserRole;
  passwordHash?: string;
  createdAt: Date;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function parseAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function defaultRoleForEmail(email: string): UserRole {
  return parseAdminEmails().includes(email) ? "admin" : "user";
}

export async function ensureUserIndexes() {
  const client = await requireMongoClientPromise();
  const db = client.db();
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const client = await requireMongoClientPromise();
  const db = client.db();
  return (await db.collection("users").findOne({ email: normalizeEmail(email) })) as any;
}

export async function createUser(params: {
  email: string;
  password: string;
  name?: string;
}): Promise<DbUser> {
  await ensureUserIndexes();

  const email = normalizeEmail(params.email);
  const passwordHash = await bcrypt.hash(params.password, 12);

  const client = await requireMongoClientPromise();
  const db = client.db();

  const doc = {
    email,
    name: params.name?.trim() || email.split("@")[0],
    role: defaultRoleForEmail(email),
    passwordHash,
    createdAt: new Date(),
  };

  const res = await db.collection("users").insertOne(doc);
  return { _id: res.insertedId, ...(doc as any) } as DbUser;
}

export async function verifyUserPassword(params: {
  email: string;
  password: string;
}): Promise<DbUser | null> {
  const user = await findUserByEmail(params.email);
  if (!user?.passwordHash) return null;
  const ok = await bcrypt.compare(params.password, user.passwordHash);
  return ok ? user : null;
}


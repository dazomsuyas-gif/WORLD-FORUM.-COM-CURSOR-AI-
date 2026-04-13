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

type DevUser = {
  _id: ObjectId;
  email: string;
  name?: string;
  role: UserRole;
  passwordHash: string;
  createdAt: Date;
};

declare global {
  // eslint-disable-next-line no-var
  var __worldForumDevUsers: Map<string, DevUser> | undefined;
}

function devUsers() {
  if (!global.__worldForumDevUsers) global.__worldForumDevUsers = new Map();
  return global.__worldForumDevUsers;
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
  if (!process.env.MONGODB_URI) return;
  const client = await requireMongoClientPromise();
  const db = client.db();
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const normalized = normalizeEmail(email);
  if (!process.env.MONGODB_URI) {
    const u = devUsers().get(normalized) ?? null;
    return u as any;
  }
  const client = await requireMongoClientPromise();
  const db = client.db();
  return (await db.collection("users").findOne({ email: normalized })) as any;
}

export async function createUser(params: {
  email: string;
  password: string;
  name?: string;
}): Promise<DbUser> {
  await ensureUserIndexes();

  const email = normalizeEmail(params.email);
  const passwordHash = await bcrypt.hash(params.password, 12);

  if (!process.env.MONGODB_URI) {
    if (devUsers().has(email)) {
      const err = new Error("E11000 duplicate key error collection: users email");
      throw err;
    }
    const doc: DevUser = {
      _id: new ObjectId(),
      email,
      name: params.name?.trim() || email.split("@")[0],
      role: defaultRoleForEmail(email),
      passwordHash,
      createdAt: new Date(),
    };
    devUsers().set(email, doc);
    return doc as any;
  }

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


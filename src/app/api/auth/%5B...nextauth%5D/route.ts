import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise, { requireMongoClientPromise } from "@/lib/mongodb";
import { verifyUserPassword } from "@/lib/users";

type Role = "user" | "admin" | "super_admin";

function parseAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function roleForEmail(email: string): Role {
  const admins = parseAdminEmails();
  if (admins.includes(email.toLowerCase())) return "admin";
  return "user";
}

const handler = NextAuth({
  ...(clientPromise ? { adapter: MongoDBAdapter(requireMongoClientPromise()) } : {}),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        // If MongoDB is not configured, we still allow an MVP admin sign-in via env.
        if (!process.env.MONGODB_URI) {
          const expected = process.env.ADMIN_PASSWORD;
          if (!expected) return null;
          if (!parseAdminEmails().includes(email)) return null;
          if (password !== expected) return null;
          return {
            id: email,
            email,
            name: email.split("@")[0],
            role: roleForEmail(email),
          } as any;
        }

        const user = await verifyUserPassword({ email, password });
        if (!user) return null;

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? user.email.split("@")[0],
          role: user.role ?? roleForEmail(user.email),
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        (token as any).role = u.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.role = (token as any).role ?? "user";
      return session;
    },
  },
});

export { handler as GET, handler as POST };


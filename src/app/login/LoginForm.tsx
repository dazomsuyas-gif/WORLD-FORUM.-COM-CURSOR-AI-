"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const search = useSearchParams();
  const next = search.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setError(null);
        const res = await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: next,
        });
        if (res?.error) setError("Invalid credentials.");
        setPending(false);
      }}
    >
      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="admin@worldforum.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs uppercase tracking-wider text-white/50">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {error ? (
        <div className="text-sm text-red-300">{error}</div>
      ) : (
        <div className="text-xs text-white/50">
          This is an MVP admin login. Set `ADMIN_EMAILS` and `ADMIN_PASSWORD` in
          your environment.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full px-5 py-3 text-sm font-semibold text-[var(--midnight)] disabled:opacity-60"
        style={{ background: "var(--grad-gold)" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}


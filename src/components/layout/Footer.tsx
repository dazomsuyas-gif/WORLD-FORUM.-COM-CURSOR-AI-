import Link from "next/link";
import { Container } from "@/components/layout/Container";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div>
            <div
              className="text-lg tracking-[0.18em] text-[var(--gold)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WORLD FORUM
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/65">
              A cinematic global platform for knowledge, languages, stories,
              community, and commerce.
            </p>
          </div>

          <div className="md:justify-self-center">
            <div className="text-xs font-medium uppercase tracking-wider text-white/50">
              Explore
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-xs font-medium uppercase tracking-wider text-white/50">
              Tagline
            </div>
            <div className="mt-4 text-sm text-white/70">
              <span className="shimmer font-semibold">Knowledge</span>{" "}
              <span className="text-white/50">without borders.</span>
            </div>
            <div className="mt-4 text-xs text-white/45">
              © {new Date().getFullYear()} WORLD FORUM. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}


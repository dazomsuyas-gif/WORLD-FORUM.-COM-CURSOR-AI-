import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact — WORLD FORUM",
  description: "Contact WORLD FORUM and connect via social channels.",
};

export default function ContactPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="WORLD FORUM"
        title="Contact"
        description="Reach out for partnerships, feedback, or support."
      />
      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Quick links
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <Link className="text-white/80 hover:text-white" href="/search">
                Search knowledge
              </Link>
              <Link className="text-white/80 hover:text-white" href="/about">
                About
              </Link>
              <Link
                className="text-white/80 hover:text-white"
                href="/why-choose-us"
              >
                Why Choose Us
              </Link>
            </div>
          </div>
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Support
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Payments, accounts, and messaging will be enabled as the next
              phases ship. For now this is a placeholder contact page.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}


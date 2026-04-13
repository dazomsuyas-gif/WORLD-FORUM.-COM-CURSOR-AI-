import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { MEMBERSHIP_PLANS, PAYMENT_METHODS } from "@/lib/payments";
import { PaymentMethodPicker } from "@/components/payment/PaymentMethodPicker";

export const metadata: Metadata = {
  title: "Membership — WORLD FORUM",
  description: "Choose a membership plan and preferred payment method.",
};

export default function MembershipPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader
        eyebrow="Payments"
        title="Membership"
        description="MVP payments UI: plans + method picker. Next phase: real payment providers + receipts."
        right={
          <Link
            href="/contact"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Need help?
          </Link>
        }
      />

      <Container className="py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {MEMBERSHIP_PLANS.map((p) => (
            <div
              key={p.id}
              className={[
                "glass p-7",
                p.highlighted ? "border-white/25 bg-white/10" : "",
              ].join(" ")}
            >
              <div
                className="text-sm tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.name}
              </div>
              <div className="mt-4 text-3xl font-semibold text-white">
                ${p.priceMonthlyUsd}
                <span className="ml-2 text-sm font-normal text-white/55">
                  / month
                </span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-white/75">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-[var(--gold)]">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <button
                  type="button"
                  className="w-full rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
                  style={{ background: "var(--grad-gold)" }}
                >
                  Choose {p.name}
                </button>
                <div className="mt-2 text-xs text-white/45">
                  Button is a stub until providers are integrated.
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="text-xs uppercase tracking-wider text-white/50">
            Payment methods (UI stub)
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
            These are the methods we’ll support. Next phase wires real provider
            integrations (Stripe, PayPal, mobile money, bank cards, crypto).
          </p>
          <div className="mt-6">
            <PaymentMethodPicker methods={PAYMENT_METHODS} />
          </div>
        </div>
      </Container>
    </main>
  );
}


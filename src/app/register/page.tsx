import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register — WORLD FORUM",
  description: "Create your WORLD FORUM account.",
};

export default function RegisterPage() {
  return (
    <main className="bg-[var(--midnight)]">
      <PageHeader eyebrow="Account" title="Register" />
      <Container className="py-12">
        <div className="mx-auto max-w-lg glass p-8">
          <RegisterForm />
        </div>
      </Container>
    </main>
  );
}


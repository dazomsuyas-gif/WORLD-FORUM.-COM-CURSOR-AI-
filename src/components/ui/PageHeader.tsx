import { Container } from "@/components/layout/Container";

export function PageHeader(props: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  const { eyebrow, title, description, right } = props;
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[var(--grad-cosmic)] blur-3xl" />
        <div className="absolute -bottom-52 left-[-220px] h-[520px] w-[520px] rounded-full bg-[var(--grad-gold)] blur-3xl opacity-60" />
      </div>
      <Container className="relative py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <div className="text-xs uppercase tracking-wider text-white/50">
                {eyebrow}
              </div>
            ) : null}
            <h1
              className="mt-3 text-4xl tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {right ? <div className="hidden sm:block">{right}</div> : null}
        </div>
      </Container>
    </section>
  );
}


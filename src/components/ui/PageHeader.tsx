import { Container } from "@/components/layout/Container";
import { BackgroundOrbs } from "@/components/effects/BackgroundOrbs";
import { Reveal } from "@/components/motion/Reveal";

export function PageHeader(props: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  const { eyebrow, title, description, right } = props;
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <BackgroundOrbs />
      <Container className="relative py-14">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
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
          </Reveal>
          {right ? (
            <Reveal transition={{ delay: 0.05, duration: 0.55 }}>
              <div className="hidden sm:block">{right}</div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}


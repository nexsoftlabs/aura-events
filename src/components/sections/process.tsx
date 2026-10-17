import { processSteps } from '@/data/whyAura';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

export function ProcessSection() {
  return (
    <Section className="overflow-hidden bg-midnight text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.04]" />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="How we work"
          title={
            <>
              From first brief to <em className="text-champagne-light">final applause.</em>
            </>
          }
          description="A calm, considered process that keeps you informed and in control."
        />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px gold-rule opacity-50 md:block"
          />
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.1} className="relative flex gap-6 md:block md:text-center">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-champagne/50 bg-midnight font-display text-xl text-champagne md:mx-auto">
                {s.step}
              </span>
              <div>
                <h3 className="text-[1.75rem] leading-tight text-ivory md:mt-8">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

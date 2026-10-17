import { PageSeoHead } from '@/lib/seo';
import { commitments } from '@/data/whyAura';
import { whyAuraFaqs } from '@/data/faqs';
import { images } from '@/data/images';
import { PageHero } from '@/components/layout/page-hero';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { WhyAuraSection } from '@/components/sections/why-aura';
import { ProcessSection } from '@/components/sections/process';
import { FaqSection } from '@/components/sections/faq';
import { CtaBannerSection } from '@/components/sections/cta-banner';

export function WhyAuraPage() {
  return (
    <>
      <PageSeoHead
        title="Why Aura"
        description="Why brands and families choose Aura Events — personalised planning, creative branding, transparent pricing and on-time execution."
        path="/why-aura"
      />
      <PageHero
        eyebrow="Why Aura"
        photo={images.gallery.banquet}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Why Aura' }]}
        title={
          <>
            The Aura <em className="text-champagne-light">difference.</em>
          </>
        }
        description="Editorial creative direction combined with disciplined production, so your event feels exceptional and runs smoothly."
      />
      <WhyAuraSection showCta={false} />
      <ProcessSection />

      <Section className="bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="Our commitments"
            align="center"
            title={
              <>
                Promises we keep, <em className="text-bronze">every time.</em>
              </>
            }
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className="rounded-[1.5rem] border border-sand bg-white p-8">
                <span className="font-display text-3xl text-champagne">0{i + 1}</span>
                <h3 className="mt-5 text-2xl text-midnight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <FaqSection items={whyAuraFaqs} title="Working with us." />
      <CtaBannerSection />
    </>
  );
}

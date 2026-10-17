import { PageSeoHead } from '@/lib/seo';
import { siteConfig } from '@/data/siteConfig';
import { images } from '@/data/images';
import { PageHero } from '@/components/layout/page-hero';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { WhyAuraSection } from '@/components/sections/why-aura';
import { ProcessSection } from '@/components/sections/process';
import { CtaBannerSection } from '@/components/sections/cta-banner';

export function AboutPage() {
  return (
    <>
      <PageSeoHead
        title="About"
        description={`Learn about ${siteConfig.name} — our story, mission, vision and planning philosophy.`}
        path="/about"
      />
      <PageHero
        size="lg"
        eyebrow="About Aura"
        photo={images.about}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        title={
          <>
            Elegance in every detail. <em className="text-champagne-light">Precision in every plan.</em>
          </>
        }
      />

      <Section className="bg-ivory">
        <Container className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-3 text-bronze">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              Our story
            </p>
            <p className="mt-6 font-display text-3xl leading-[1.3] text-midnight md:text-[2.5rem]">{siteConfig.about}</p>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            <ResponsiveImage
              photo={images.storyMain}
              alt="Reception table styled with florals"
              wrapperClassName="mt-12 aspect-[3/4] rounded-[1.5rem]"
              sizes="25vw"
            />
            <ResponsiveImage
              photo={images.gallery.stage}
              alt="Speaker presenting on a conference stage"
              wrapperClassName="aspect-[3/4] rounded-[1.5rem]"
              sizes="25vw"
            />
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-midnight py-0 text-ivory md:py-0">
        <Container className="grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          {[
            { label: 'Our mission', text: siteConfig.mission },
            { label: 'Our vision', text: siteConfig.vision },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="py-20 md:px-12 md:py-28 md:first:pl-0 md:last:pr-0">
              <p className="eyebrow text-champagne">{item.label}</p>
              <p className="mt-6 font-display text-3xl italic leading-snug text-ivory md:text-[2.2rem]">{item.text}</p>
            </Reveal>
          ))}
        </Container>
      </Section>

      <WhyAuraSection showCta={false} />
      <ProcessSection />
      <CtaBannerSection />
    </>
  );
}

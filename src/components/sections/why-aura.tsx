import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { valuePropositions } from '@/data/whyAura';
import { images } from '@/data/images';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { Button } from '@/components/ui/button';

export function WhyAuraSection({ showCta = true }: { showCta?: boolean }) {
  return (
    <Section className="bg-ivory-deep/60">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Why Aura"
              title={
                <>
                  The partner behind <em className="text-bronze">the poise.</em>
                </>
              }
              description="Exceptional events look effortless because of what happens behind the scenes. This is how we work for you."
            />
            <Reveal delay={0.1} className="mt-10 hidden lg:block">
              <ResponsiveImage
                photo={images.about}
                alt="Long banquet table styled with candles and greenery"
                wrapperClassName="aspect-[5/4] rounded-[1.75rem]"
                sizes="40vw"
              />
            </Reveal>
            {showCta ? (
              <Reveal delay={0.15} className="mt-10">
                <Button asChild variant="dark">
                  <Link to="/why-aura">
                    Our approach
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
              </Reveal>
            ) : null}
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-sand bg-sand sm:grid-cols-2 lg:col-span-7">
          {valuePropositions.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal
                as="li"
                key={v.id}
                delay={(i % 2) * 0.08}
                className={`group bg-ivory p-8 transition-colors duration-500 hover:bg-white md:p-10 ${i === valuePropositions.length - 1 ? 'sm:col-span-2' : ''}`}
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-champagne/40 text-bronze transition-colors duration-500 group-hover:bg-midnight group-hover:text-champagne">
                  <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-7 text-[1.75rem] leading-tight text-midnight">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{v.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

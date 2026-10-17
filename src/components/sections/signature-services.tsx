import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getServiceBySlug, type Service } from '@/data/services';
import { ServiceFeatureCard } from '@/features/services/service-card';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

const layout: { slug: string; className: string; media: string }[] = [
  { slug: 'birthday-marriage-reception', className: 'lg:col-span-7 lg:row-span-2', media: 'min-h-[460px] lg:min-h-[640px]' },
  { slug: 'corporate-events', className: 'lg:col-span-5', media: 'min-h-[400px] lg:min-h-0' },
  { slug: 'branding', className: 'lg:col-span-5', media: 'min-h-[400px] lg:min-h-0' },
  { slug: 'atl-btl-activation', className: 'lg:col-span-4', media: 'min-h-[420px]' },
  { slug: 'film-production', className: 'lg:col-span-4', media: 'min-h-[420px]' },
  { slug: 'advertisement-films', className: 'lg:col-span-4', media: 'min-h-[420px]' },
];

const featured = layout
  .map((l) => ({ ...l, service: getServiceBySlug(l.slug) }))
  .filter((l): l is typeof l & { service: Service } => Boolean(l.service));

export function SignatureServicesSection() {
  return (
    <Section className="bg-ivory">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Signature services"
            title={
              <>
                Crafted for the moments <em className="text-bronze">that matter.</em>
              </>
            }
            description="From intimate celebrations to national campaigns — a selection of what we do best."
          />
          <Reveal>
            <Button asChild variant="outline-dark">
              <Link to="/services">
                All 12 services
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[310px_310px_auto]">
          {featured.map(({ service, className, media }, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08} className={`h-full ${className} ${i === 0 ? 'sm:col-span-2' : ''}`}>
              <ServiceFeatureCard
                service={service}
                index={i}
                mediaClassName={media}
                sizes={i === 0 ? '(min-width: 1024px) 58vw, 100vw' : undefined}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

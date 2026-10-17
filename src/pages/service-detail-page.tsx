import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { PageSeoHead, ServiceJsonLd } from '@/lib/seo';
import { getRelatedServices, getServiceBySlug, serviceCategories } from '@/data/services';
import { processSteps } from '@/data/whyAura';
import { PageHero } from '@/components/layout/page-hero';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { ServiceCatalogCard } from '@/features/services/service-card';
import { CtaBannerSection } from '@/components/sections/cta-banner';
import { NotFoundPage } from '@/pages/not-found-page';
import { getWhatsAppLink } from '@/lib/contact-links';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFoundPage />;

  const category = serviceCategories.find((c) => c.id === service.category);
  const related = getRelatedServices(service.slug);
  const whatsapp = getWhatsAppLink(`Hello Aura Events, I would like to enquire about ${service.title}.`);
  const Icon = service.icon;

  return (
    <>
      <PageSeoHead title={service.title} description={service.description} path={`/services/${service.slug}`} />
      <ServiceJsonLd name={service.title} description={service.description} path={`/services/${service.slug}`} />
      <PageHero
        size="lg"
        eyebrow={category?.label ?? 'Service'}
        photo={service.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
        title={service.title}
        description={service.shortDescription}
      >
        <Button asChild size="lg">
          <Link to={`/contact?service=${service.slug}`}>
            Enquire about this service
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </PageHero>

      <Section className="bg-ivory">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-bronze">
                <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                Overview
              </p>
              <p className="mt-6 font-display text-3xl leading-[1.3] text-midnight md:text-[2.4rem]">
                {service.description}
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <Reveal className="rounded-[1.5rem] border border-sand bg-white p-8">
                <h2 className="text-2xl text-midnight">What you gain</h2>
                <ul className="mt-6 space-y-4">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-bronze" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="rounded-[1.5rem] bg-midnight p-8 text-ivory">
                <h2 className="text-2xl text-ivory">What we deliver</h2>
                <ul className="mt-6 space-y-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm leading-relaxed text-ivory/70">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-champagne" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="mt-16">
              <h2 className="text-3xl text-midnight">How we work</h2>
              <ol className="mt-8 divide-y divide-sand border-y border-sand">
                {processSteps.map((s) => (
                  <li key={s.step} className="grid grid-cols-[3.5rem_1fr] gap-4 py-5 sm:grid-cols-[3.5rem_12rem_1fr]">
                    <span className="font-display text-xl text-bronze">{s.step}</span>
                    <span className="font-display text-xl text-midnight">{s.title}</span>
                    <span className="col-start-2 text-sm leading-relaxed text-mist sm:col-start-3">{s.description}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="rounded-[1.75rem] border border-sand bg-white p-8 lg:sticky lg:top-32">
              <span className="flex size-14 items-center justify-center rounded-full bg-midnight text-champagne">
                <Icon aria-hidden className="size-6" strokeWidth={1.4} />
              </span>
              <h2 className="mt-6 text-3xl leading-tight text-midnight">Planning {service.title.toLowerCase()}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Share your date, city and vision. A dedicated planner will reply with next steps.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild>
                  <Link to={`/contact?service=${service.slug}`}>Start your enquiry</Link>
                </Button>
                {whatsapp ? (
                  <Button asChild variant="outline-dark">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden className="size-4" />
                      WhatsApp
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </aside>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section className="border-t border-sand bg-ivory-deep/50">
          <Container>
            <Reveal className="flex items-end justify-between gap-6">
              <h2 className="text-4xl text-midnight md:text-5xl">You may also need</h2>
              <Link to="/services" className="hidden text-sm font-semibold text-midnight link-underline sm:inline">
                All services
              </Link>
            </Reveal>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.06}>
                  <ServiceCatalogCard service={s} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBannerSection />
    </>
  );
}

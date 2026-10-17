import { useSearchParams } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import { PageSeoHead } from '@/lib/seo';
import { serviceCategories, services, type ServiceCategory } from '@/data/services';
import { images } from '@/data/images';
import { PageHero } from '@/components/layout/page-hero';
import { ServiceCatalogCard } from '@/features/services/service-card';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { CtaBannerSection } from '@/components/sections/cta-banner';

type Filter = ServiceCategory | 'all';

const isCategory = (v: string | null): v is ServiceCategory =>
  serviceCategories.some((c) => c.id === v);

const tabClass =
  'shrink-0 rounded-full border border-sand px-5 py-2.5 text-[0.8125rem] font-medium text-mist transition-all duration-300 hover:border-midnight/40 hover:text-midnight data-[state=active]:border-midnight data-[state=active]:bg-midnight data-[state=active]:text-ivory';

export function ServicesPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category');
  const filter: Filter = isCategory(raw) ? raw : 'all';

  const onChange = (value: string) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete('category');
    else next.set('category', value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const primary = serviceCategories.filter((c) => c.primary);
  const business = serviceCategories.filter((c) => !c.primary);
  const coreServices = services.filter((s) => primary.some((c) => c.id === s.category));
  const businessServices = services.filter((s) => business.some((c) => c.id === s.category));
  const visible = filter === 'all' ? coreServices : services.filter((s) => s.category === filter);
  const activeCategory = serviceCategories.find((c) => c.id === filter);

  return (
    <>
      <PageSeoHead
        title="Services"
        description="Explore all twelve Aura Events services — corporate events, weddings and celebrations, branding, activations, film and media production, printing and business consultancy."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        photo={images.services.corporate}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        title={
          <>
            Twelve services. <em className="text-champagne-light">One trusted partner.</em>
          </>
        }
        description="Events, brand experiences and media production, planned and delivered by one coordinated team."
      />

      <Section className="bg-ivory pt-16 md:pt-20">
        <Container>
          <Tabs.Root value={filter} onValueChange={onChange}>
            <Tabs.List
              aria-label="Filter services by category"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            >
              <Tabs.Trigger value="all" className={tabClass}>
                All services
              </Tabs.Trigger>
              {serviceCategories.map((c) => (
                <Tabs.Trigger key={c.id} value={c.id} className={tabClass}>
                  {c.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value={filter} className="mt-12 outline-none" forceMount>
              {activeCategory ? (
                <p className="mb-10 max-w-2xl font-display text-2xl italic text-midnight/80">
                  {activeCategory.description}.
                </p>
              ) : null}
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                    <ServiceCatalogCard service={s} />
                  </Reveal>
                ))}
              </ul>
            </Tabs.Content>
          </Tabs.Root>
        </Container>
      </Section>

      {filter === 'all' && business[0] ? (
        <Section className="border-t border-sand bg-ivory-deep/50 py-20 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-bronze">{business[0].label}</p>
              <h2 className="mt-4 text-4xl leading-tight text-midnight">Specialist consultancy</h2>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Alongside events and media, we offer focused business services. They are listed separately here to keep
                the main catalogue clear.
              </p>
            </Reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {businessServices.map((s, i) => (
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

import { useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Info } from 'lucide-react';
import { PageSeoHead } from '@/lib/seo';
import { galleryCategories, inspirationGallery, type GalleryCategory } from '@/data/gallery';
import { images } from '@/data/images';
import { PageHero } from '@/components/layout/page-hero';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { GalleryGrid } from '@/features/portfolio/gallery-grid';
import { CtaBannerSection } from '@/components/sections/cta-banner';

const tabClass =
  'shrink-0 rounded-full border border-sand px-5 py-2.5 text-[0.8125rem] font-medium text-mist transition-all hover:text-midnight data-[state=active]:border-midnight data-[state=active]:bg-midnight data-[state=active]:text-ivory';

export function PortfolioPage() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const items = useMemo(
    () => (filter === 'all' ? inspirationGallery : inspirationGallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      <PageSeoHead
        title="Portfolio"
        description="The Aura Events portfolio of verified case studies is coming soon. Explore our mood gallery of event inspiration."
        path="/portfolio"
      />
      <PageHero
        eyebrow="Portfolio"
        photo={images.gallery.sparklers}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        title={
          <>
            Case studies, <em className="text-champagne-light">coming soon.</em>
          </>
        }
        description="We are curating a portfolio of verified projects, shared with our clients' permission. Meanwhile, browse the moods and settings we love to design."
      />

      <Section className="bg-ivory pt-16 md:pt-20">
        <Container>
          <Reveal className="mb-10 flex items-start gap-3 rounded-2xl border border-sand bg-white px-5 py-4 text-sm text-mist">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-bronze" />
            <p>
              <strong className="font-semibold text-midnight">Inspiration gallery.</strong> These licensed photographs
              illustrate styles and settings. They are not Aura Events projects.
            </p>
          </Reveal>

          <Tabs.Root
            value={filter}
            onValueChange={(v) => {
              const match = galleryCategories.find((c) => c === v);
              setFilter(match ?? 'all');
            }}
          >
            <Tabs.List
              aria-label="Filter inspiration by category"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            >
              <Tabs.Trigger value="all" className={tabClass}>
                All
              </Tabs.Trigger>
              {galleryCategories.map((c) => (
                <Tabs.Trigger key={c} value={c} className={tabClass}>
                  {c}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value={filter} forceMount className="mt-12 outline-none">
              {items.length > 0 ? (
                <GalleryGrid key={filter} items={items} />
              ) : (
                <p className="py-20 text-center font-display text-2xl italic text-mist">
                  Images for this category are coming soon.
                </p>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Container>
      </Section>
      <CtaBannerSection
        title="Your event could be our first featured story."
        description="Let's create something worth showcasing — together."
      />
    </>
  );
}

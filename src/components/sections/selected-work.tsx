import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { inspirationGallery } from '@/data/gallery';
import { GalleryGrid } from '@/features/portfolio/gallery-grid';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

// Portrait + landscape per column keeps the three masonry columns level.
const homeGalleryIds = ['banquet', 'stage', 'evening-wedding', 'projector', 'live-crowd', 'conference-hall'];
const homeGallery = homeGalleryIds
  .map((id) => inspirationGallery.find((g) => g.id === id))
  .filter((g) => g !== undefined);

export function SelectedWorkSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                A world of <em className="text-bronze">atmosphere.</em>
              </>
            }
            description="Our curated case-study portfolio is being prepared. Until it launches, this mood gallery shows the look and feel we design towards."
          />
          <Reveal>
            <Button asChild variant="outline-dark">
              <Link to="/portfolio">
                View portfolio
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-16">
          <GalleryGrid items={homeGallery} />
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-mist">
          <Info aria-hidden className="size-3.5" />
          Images are licensed inspiration photography and do not depict Aura Events projects.
        </p>
      </Container>
    </Section>
  );
}

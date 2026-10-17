import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { images } from '@/data/images';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/lib/contact-links';

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBannerSection({
  title = 'Ready to plan something extraordinary?',
  description = 'Tell us about your occasion. We will respond with thoughtful next steps and an invitation to a discovery call.',
}: CtaBannerProps) {
  const whatsapp = getWhatsAppLink('Hello Aura Events, I would like to plan an event.');

  return (
    <section className="bg-ivory px-3 pb-3 sm:px-5 sm:pb-5">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-midnight text-ivory">
        <ResponsiveImage photo={images.cta} alt="" sizes="100vw" wrapperClassName="absolute inset-0 -z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/40" />
        <Container className="py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-champagne">
              <span aria-hidden className="h-px w-8 bg-champagne/70" />
              Start the conversation
            </p>
            <h2 className="mt-6 text-[2.6rem] leading-[1.04] text-ivory sm:text-6xl">{title}</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/75 md:text-lg">{description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/contact">
                  Plan Your Event
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              {whatsapp ? (
                <Button asChild size="lg" variant="outline-light">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden className="size-4" />
                    WhatsApp us
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" variant="outline-light">
                  <Link to="/services">Browse services</Link>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

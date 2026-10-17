import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { images } from '@/data/images';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';

export function IntroStorySection() {
  return (
    <Section id="intro" className="overflow-hidden bg-ivory">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <Reveal className="relative mr-10 sm:mr-24">
            <ResponsiveImage
              photo={images.storyMain}
              alt="Reception tables dressed with florals, candles and fine glassware"
              wrapperClassName="aspect-[4/5] rounded-[2rem]"
              sizes="(min-width: 1024px) 40vw, 85vw"
            />
          </Reveal>
          <Reveal
            delay={0.2}
            className="absolute -bottom-10 right-0 w-[46%] rounded-[1.5rem] border-[6px] border-ivory shadow-[0_30px_60px_-25px_rgba(16,20,29,0.45)] sm:-bottom-12"
          >
            <ResponsiveImage
              photo={images.storyDetail}
              alt="Floral aisle leading to a wedding stage"
              wrapperClassName="aspect-[3/4] rounded-[1.1rem]"
              sizes="(min-width: 1024px) 20vw, 45vw"
            />
          </Reveal>
          <Reveal
            delay={0.35}
            className="absolute left-6 top-6 rounded-2xl bg-midnight/85 px-5 py-4 text-ivory backdrop-blur-md sm:left-8 sm:top-8"
          >
            <p className="font-display text-4xl leading-none text-champagne-light">
              {siteConfig.claims.eventsDelivered}
            </p>
            <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/70">
              {siteConfig.claims.eventsDeliveredLabel}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-bronze">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              The Aura story
            </p>
            <h2 className="mt-5 text-[2.5rem] leading-[1.05] text-midnight sm:text-5xl lg:text-[3.4rem]">
              Where vision meets <em className="text-bronze">flawless</em> execution.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-mist">{siteConfig.about}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-10 border-l border-champagne pl-6">
              <p className="font-display text-2xl italic leading-snug text-midnight">
                &ldquo;{siteConfig.mission}&rdquo;
              </p>
              <footer className="eyebrow mt-4 text-bronze">Our mission</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-midnight"
            >
              <span className="link-underline">Discover Aura</span>
              <span className="flex size-10 items-center justify-center rounded-full border border-midnight/20 transition-colors group-hover:border-midnight group-hover:bg-midnight group-hover:text-ivory">
                <ArrowRight aria-hidden className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { images } from '@/data/images';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.22, 1, 0.36, 1] as const;

const quickLinks = [
  { label: 'Corporate & MICE', href: '/services/corporate-events' },
  { label: 'Weddings & Celebrations', href: '/services/birthday-marriage-reception' },
  { label: 'Branding & Film', href: '/services/branding' },
];

export function HeroSection() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-midnight text-ivory">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.8, ease }}
      >
        <ResponsiveImage
          photo={images.hero}
          alt=""
          priority
          sizes="100vw"
          wrapperClassName="size-full"
          className="object-[center_40%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/70 via-midnight/45 to-midnight" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/80 via-midnight/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-[0.06]" />

      <Container className="flex flex-1 flex-col justify-end pb-14 pt-36 md:justify-center md:pb-10">
        <div className="max-w-4xl">
          <motion.p {...rise(0.2)} className="eyebrow flex items-center gap-4 text-champagne">
            <span aria-hidden className="h-px w-12 bg-champagne/70" />
            {siteConfig.tagline}
          </motion.p>
          <motion.h1
            {...rise(0.35)}
            className="mt-7 text-[3.1rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[6.5rem]"
          >
            Unforgettable events,
            <br />
            <em className="font-normal text-champagne-light">crafted with elegance.</em>
          </motion.h1>
          <motion.p
            {...rise(0.55)}
            className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg"
          >
            Aura Events plans corporate events, weddings and celebrations, and produces branding,
            films and campaigns for clients across India.
          </motion.p>
          <motion.div {...rise(0.7)} className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button asChild size="lg">
              <Link to="/contact">
                Plan Your Event
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link to="/portfolio">Explore Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="border-t border-white/10 bg-midnight/30 backdrop-blur-md"
      >
        <Container className="flex items-stretch justify-between">
          <ul className="grid flex-1 grid-cols-1 divide-white/10 sm:grid-cols-3 sm:divide-x">
            {quickLinks.map((l, i) => (
              <li key={l.href} className={i > 0 ? 'hidden sm:block' : undefined}>
                <Link
                  to={l.href}
                  className="group flex h-full items-center justify-between gap-4 py-5 text-sm text-ivory/75 transition-colors hover:text-ivory sm:px-6 sm:first:pl-0"
                >
                  <span>
                    <span className="mr-3 font-display text-champagne">0{i + 1}</span>
                    {l.label}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 -translate-x-2 text-champagne opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#intro"
            className="hidden items-center gap-3 pl-8 text-xs uppercase tracking-[0.25em] text-ivory/60 hover:text-ivory lg:flex"
          >
            Scroll
            <ArrowDown aria-hidden className="size-4 animate-bounce text-champagne [animation-duration:2.4s]" />
          </a>
        </Container>
      </motion.div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { images } from '@/data/images';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function InterludeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const capable = useMediaQuery('(min-width: 1024px) and (pointer: fine)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const parallax = capable && !reduced;

  return (
    <section ref={ref} className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-midnight">
      <motion.div className="absolute -inset-y-[10%] inset-x-0 -z-20" style={parallax ? { y } : undefined}>
        <ResponsiveImage photo={images.interlude} alt="" sizes="100vw" wrapperClassName="size-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-midnight/65" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(16,20,29,0.85)_80%)]" />

      <Container className="py-28 text-center">
        <Reveal>
          <span aria-hidden className="block h-14 font-display text-[7rem] leading-none text-champagne/80 sm:h-16 sm:text-[8.5rem]">&ldquo;</span>
          <blockquote className="mx-auto max-w-4xl">
            <p className="font-display text-[2.1rem] italic leading-[1.15] text-ivory sm:text-5xl lg:text-[3.75rem]">
              Every gathering is a story waiting to be told — with light, detail and heart.
            </p>
            <footer className="eyebrow mt-10 flex items-center justify-center gap-4 text-champagne">
              <span aria-hidden className="h-px w-10 bg-champagne/60" />
              The Aura philosophy
              <span aria-hidden className="h-px w-10 bg-champagne/60" />
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}

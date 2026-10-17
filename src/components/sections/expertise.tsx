import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { cn } from '@/lib/utils';

const disciplines = serviceCategories.map((cat) => {
  const list = getServicesByCategory(cat.id);
  return { ...cat, services: list, photo: list[0]?.image };
});

export function ExpertiseSection() {
  const [active, setActive] = useState(0);
  const current = disciplines[active];

  return (
    <Section className="overflow-hidden bg-midnight text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-[0.04]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-champagne/10 blur-[120px]"
      />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Our expertise"
            title={
              <>
                Six disciplines. <em className="text-champagne-light">One standard.</em>
              </>
            }
          />
          <Reveal className="max-w-sm text-ivory/60">
            Twelve specialist services, organised so you can find the right team for your brief.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ul className="border-b border-white/10 lg:col-span-7">
            {disciplines.map((d, i) => (
              <Reveal as="li" key={d.id} delay={i * 0.05}>
                <Link
                  to={`/services?category=${d.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    'group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-white/10 py-7 transition-colors sm:grid-cols-[4rem_1fr_auto]',
                    active === i ? 'text-ivory' : 'text-ivory/55',
                  )}
                >
                  <span className="font-display text-lg text-champagne">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-[2.6rem]">
                      {d.label}
                    </span>
                    <span className="mt-2 block text-sm text-ivory/50">
                      {d.services.map((s) => s.title).join(' · ')}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-full border transition-all duration-500',
                      active === i
                        ? 'border-champagne bg-champagne text-midnight'
                        : 'border-white/15 text-ivory/60',
                    )}
                  >
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                {current?.photo ? (
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ResponsiveImage
                      photo={current.photo}
                      alt=""
                      wrapperClassName="size-full"
                      sizes="40vw"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
              <p className="absolute inset-x-8 bottom-8 text-sm leading-relaxed text-ivory/80">
                {current?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { Photo } from '@/data/images';
import { Container } from '@/components/ui/container';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  photo?: Photo;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
  size?: 'md' | 'lg';
}

export function PageHero({
  eyebrow,
  title,
  description,
  photo,
  breadcrumbs,
  children,
  size = 'md',
}: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className={cn(
        'relative isolate flex items-end overflow-hidden bg-midnight text-ivory',
        size === 'lg' ? 'min-h-[78svh]' : 'min-h-[60svh]',
      )}
    >
      {photo ? (
        <motion.div
          className="absolute inset-0 -z-20"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ResponsiveImage photo={photo} alt="" priority sizes="100vw" wrapperClassName="size-full" />
        </motion.div>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,rgba(199,164,106,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(34,41,54,0.9),transparent_60%)]"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/35"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-[0.05]" />

      <Container className="pb-16 pt-36 md:pb-20 md:pt-44">
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ivory/60">
              {breadcrumbs.map((item, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                    {i > 0 ? <ChevronRight aria-hidden className="size-3 text-champagne/70" /> : null}
                    {item.href && !last ? (
                      <Link to={item.href} className="hover:text-ivory">
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current={last ? 'page' : undefined} className={last ? 'text-ivory/90' : undefined}>
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="eyebrow flex items-center gap-3 text-champagne">
            <span aria-hidden className="h-px w-10 bg-champagne/70" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-[5.25rem]">{title}</h1>
          {description ? (
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">{description}</p>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </motion.div>
      </Container>
    </section>
  );
}

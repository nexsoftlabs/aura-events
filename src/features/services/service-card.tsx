import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { serviceCategories } from '@/data/services';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
  /** Tailwind aspect / height utilities for the image area */
  mediaClassName?: string;
  sizes?: string;
}

/** Full-bleed editorial photo card with hover reveal. */
export function ServiceFeatureCard({
  service,
  index,
  className,
  mediaClassName = 'min-h-[420px]',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: ServiceCardProps) {
  const Icon = service.icon;
  const category = serviceCategories.find((c) => c.id === service.category)?.label;

  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[1.75rem] bg-midnight text-ivory',
        mediaClassName,
        className,
      )}
    >
      <ResponsiveImage
        photo={service.image}
        alt=""
        sizes={sizes}
        wrapperClassName="absolute inset-0 -z-20"
        className="transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/45 to-midnight/5 transition-opacity duration-700 group-hover:opacity-95"
      />

      <div className="absolute inset-x-7 top-7 flex items-start justify-between">
        <span className="rounded-full border border-white/20 bg-midnight/30 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/85 backdrop-blur-md">
          {category}
        </span>
        <span className="flex size-11 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-champagne group-hover:text-midnight">
          <ArrowUpRight aria-hidden className="size-5" />
        </span>
      </div>

      <div className="p-7 md:p-8">
        <div className="flex items-center gap-3 text-champagne">
          {index !== undefined ? (
            <span className="font-display text-lg">{String(index + 1).padStart(2, '0')}</span>
          ) : null}
          <Icon aria-hidden className="size-4" />
        </div>
        <h3 className="mt-3 text-3xl leading-tight text-ivory md:text-[2.15rem]">{service.title}</h3>
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-(--ease-luxe) md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-ivory/75">
            <span className="block pt-3">{service.shortDescription}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/** Image-topped catalogue card used on the services index and related lists. */
export function ServiceCatalogCard({ service, className, sizes = '(min-width: 1024px) 33vw, 100vw' }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-sand bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(16,20,29,0.35)]',
        className,
      )}
    >
      <ResponsiveImage
        photo={service.image}
        alt={service.imageAlt}
        sizes={sizes}
        wrapperClassName="aspect-[16/10]"
        className="transition-transform duration-[1.2s] ease-(--ease-luxe) group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-full bg-ivory text-bronze">
            <Icon aria-hidden className="size-5" />
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-5 text-mist transition-all duration-500 group-hover:rotate-45 group-hover:text-midnight"
          />
        </div>
        <h3 className="mt-6 text-[1.75rem] leading-tight text-midnight">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{service.shortDescription}</p>
        <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
          Discover service
        </span>
      </div>
    </Link>
  );
}

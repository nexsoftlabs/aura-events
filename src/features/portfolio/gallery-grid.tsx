import { useState } from 'react';
import { Expand } from 'lucide-react';
import type { GalleryItem } from '@/data/gallery';
import { Reveal } from '@/components/ui/reveal';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { Lightbox } from '@/components/ui/lightbox';
import { cn } from '@/lib/utils';

const aspectClass: Record<GalleryItem['aspect'], string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] text-left"
              aria-label={`Open image: ${item.alt}`}
            >
              <ResponsiveImage
                photo={item.photo}
                alt={item.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                wrapperClassName={cn(aspectClass[item.aspect])}
                className="transition-transform duration-[1.2s] ease-(--ease-luxe) group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="eyebrow text-champagne-light">{item.category}</span>
                <Expand aria-hidden className="size-4" />
              </span>
              <span className="absolute left-4 top-4 rounded-full bg-midnight/55 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ivory/85 backdrop-blur-md">
                Inspiration
              </span>
            </button>
          </Reveal>
        ))}
      </ul>
      <Lightbox items={items} index={index} onIndexChange={setIndex} />
    </>
  );
}

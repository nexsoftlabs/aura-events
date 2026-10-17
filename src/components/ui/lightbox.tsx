import { useCallback, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/data/gallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function Lightbox({ items, index, onIndexChange }: LightboxProps) {
  const reduced = useReducedMotion();
  const open = index !== null;
  const item = index !== null ? items[index] : undefined;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-midnight/95 backdrop-blur-md data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 outline-none sm:p-10"
        >
          <Dialog.Title className="sr-only">
            {item ? `${item.category} inspiration image ${(index ?? 0) + 1} of ${items.length}` : 'Gallery'}
          </Dialog.Title>
          <div className="absolute inset-x-4 top-4 flex items-center justify-between text-ivory sm:inset-x-8 sm:top-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ivory/60">
              {(index ?? 0) + 1} / {items.length} · {item?.category}
            </p>
            <Dialog.Close
              className="flex size-11 items-center justify-center rounded-full border border-ivory/20 hover:border-champagne"
              aria-label="Close gallery"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {item ? (
              <motion.figure
                key={item.id}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col items-center"
              >
                <img
                  src={item.photo.src}
                  alt={item.alt}
                  className="max-h-[78svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
                <figcaption className="mt-4 max-w-xl text-center text-sm text-ivory/70">
                  {item.alt} <span className="text-ivory/40">— inspiration image, not an Aura project</span>
                </figcaption>
              </motion.figure>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-midnight/50 text-ivory hover:border-champagne sm:left-8"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-midnight/50 text-ivory hover:border-champagne sm:right-8"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

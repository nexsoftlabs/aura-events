import { services } from '@/data/services';

export function ServiceMarquee() {
  const items = services.map((s) => s.title);

  return (
    <div aria-hidden className="relative overflow-hidden border-b border-sand bg-ivory py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ivory to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ivory to-transparent" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={`${dup}-${item}`} className="flex items-center">
                <span className="whitespace-nowrap px-8 font-display text-2xl italic text-midnight/80 md:text-3xl">
                  {item}
                </span>
                <span className="text-champagne">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn('size-9', className)}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path
        d="M12.5 28 19.2 11.2a.9.9 0 0 1 1.6 0L27.5 28M15.4 21.6h9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn('group inline-flex items-center gap-3 text-ivory', className)}
    >
      <LogoMark className="text-champagne transition-transform duration-700 group-hover:rotate-[20deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.6rem] font-medium tracking-[0.04em]">Aura</span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-champagne/90">
          Events
        </span>
      </span>
    </Link>
  );
}

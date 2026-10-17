import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const onDark = tone === 'dark';
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p
        className={cn(
          'eyebrow flex items-center gap-3',
          align === 'center' && 'justify-center',
          onDark ? 'text-champagne' : 'text-bronze',
        )}
      >
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
        {align === 'center' ? <span aria-hidden className="h-px w-8 bg-current opacity-60" /> : null}
      </p>
      <Heading
        className={cn(
          'mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]',
          onDark ? 'text-ivory' : 'text-midnight',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'mt-6 text-base leading-relaxed md:text-[1.0625rem]',
            onDark ? 'text-ivory/70' : 'text-mist',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

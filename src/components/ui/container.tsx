import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12', className)} {...props} />;
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('relative py-24 md:py-32', className)} {...props} />;
}

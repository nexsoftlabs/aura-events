import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'dark' | 'outline-light' | 'outline-dark' | 'ghost-light';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  gold: 'bg-champagne text-midnight hover:bg-champagne-light shadow-[0_10px_30px_-12px_rgba(199,164,106,0.6)]',
  dark: 'bg-midnight text-ivory hover:bg-slate',
  'outline-light':
    'border border-ivory/35 text-ivory hover:border-champagne hover:text-champagne-light backdrop-blur-sm',
  'outline-dark': 'border border-midnight/25 text-midnight hover:border-midnight hover:bg-midnight hover:text-ivory',
  'ghost-light': 'text-ivory hover:text-champagne-light',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-10 px-5 text-[0.8125rem]',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-[0.9375rem]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-all duration-300 ease-(--ease-luxe) disabled:pointer-events-none disabled:opacity-60',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

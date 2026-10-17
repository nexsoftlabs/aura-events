import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: AccordionPrimitive.AccordionItemProps) {
  return <AccordionPrimitive.Item className={cn('border-b border-sand', className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex min-h-16 flex-1 items-center justify-between gap-6 py-6 text-left font-display text-xl leading-snug text-midnight transition-colors hover:text-bronze md:text-2xl',
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-midnight/15 transition-all duration-500 group-hover:border-bronze group-data-[state=open]:rotate-45 group-data-[state=open]:border-midnight group-data-[state=open]:bg-midnight group-data-[state=open]:text-ivory">
          <Plus aria-hidden className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: AccordionPrimitive.AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('max-w-2xl pb-7 pr-14 text-[0.9375rem] leading-relaxed text-mist', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

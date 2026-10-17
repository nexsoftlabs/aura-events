import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const controlBase =
  'w-full rounded-xl border border-sand bg-ivory/40 px-4 text-[0.9375rem] text-midnight placeholder:text-mist/60 transition-all duration-300 hover:border-midnight/25 focus:border-midnight focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/20 aria-[invalid=true]:border-red-700/70 aria-[invalid=true]:bg-red-50/40 disabled:cursor-not-allowed disabled:opacity-60';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(controlBase, 'h-13', className)} {...props} />,
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(controlBase, 'min-h-36 resize-y py-3.5', className)} {...props} />
  ),
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select ref={ref} className={cn(controlBase, 'h-13 appearance-none pr-11', className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mist"
      />
    </div>
  ),
);
Select.displayName = 'Select';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.8125rem] font-semibold text-midnight">
        <span>
          {label}
          {required ? (
            <span className="text-bronze" aria-hidden>
              {' '}
              *
            </span>
          ) : null}
        </span>
        {!required ? <span className="text-xs font-normal text-mist">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mist">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

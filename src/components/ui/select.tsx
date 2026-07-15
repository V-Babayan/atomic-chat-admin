import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition',
        'focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

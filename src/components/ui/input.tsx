import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition',
        'placeholder:text-neutral-400',
        'focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10',
        'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
        className,
      )}
      {...props}
    />
  );
});

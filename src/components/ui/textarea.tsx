import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition',
        'placeholder:text-neutral-400',
        'focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10',
        'min-h-[80px]',
        className,
      )}
      {...props}
    />
  );
});

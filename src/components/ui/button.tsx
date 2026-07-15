import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400',
  secondary:
    'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
  danger: 'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = 'primary', type, ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition outline-none',
          'focus-visible:ring-2 focus-visible:ring-neutral-900/20',
          'disabled:cursor-not-allowed',
          VARIANTS[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

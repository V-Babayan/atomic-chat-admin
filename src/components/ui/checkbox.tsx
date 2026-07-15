import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, id, ...props }, ref) {
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-center gap-2 text-sm text-neutral-800 select-none cursor-pointer',
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
          {...props}
        />
        {label}
      </label>
    );
  },
);

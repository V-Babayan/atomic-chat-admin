import type { LabelHTMLAttributes, ReactNode } from 'react';
import { cn } from '~/utils/cn';

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}

export function Field({ label, hint, error, children, className, ...props }: FieldProps) {
  return (
    <label
      {...props}
      className={cn('flex flex-col gap-1.5', className)}
    >
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      {children}
      {error ? (
        <span className="text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="text-xs text-neutral-500">{hint}</span>
      ) : null}
    </label>
  );
}

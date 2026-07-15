import { useController, useFormContext } from 'react-hook-form';
import { PLATFORMS, type MobileModel, type Platform } from '~/schemas/model';
import { Checkbox } from '~/components/ui/checkbox';

export function PlatformsField() {
  const { control } = useFormContext<MobileModel>();
  const { field, fieldState } = useController({
    control,
    name: 'platforms',
  });

  function toggle(platform: Platform) {
    const set = new Set(field.value ?? []);
    if (set.has(platform)) set.delete(platform);
    else set.add(platform);
    field.onChange(Array.from(set));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-800">Platforms</span>
      <div className="flex gap-4">
        {PLATFORMS.map(p => (
          <Checkbox
            key={p}
            id={`platform-${p}`}
            label={p}
            checked={field.value?.includes(p) ?? false}
            onChange={() => toggle(p)}
          />
        ))}
      </div>
      {fieldState.error?.message && (
        <span className="text-xs text-red-600">{fieldState.error.message}</span>
      )}
    </div>
  );
}

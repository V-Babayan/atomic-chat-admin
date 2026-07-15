import { useFieldArray, useFormContext } from 'react-hook-form';
import { BADGE_TONES, type MobileModel } from '~/schemas/model';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Select } from '~/components/ui/select';

const DEFAULT_TONE = 'bg-neutral-200 text-neutral-800';
const TONE_CLASS: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  gray: DEFAULT_TONE,
  blue: 'bg-blue-100 text-blue-800',
};

export function BadgeArrayField() {
  const { control, register, watch, formState } = useFormContext<MobileModel>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'badges',
  });
  const badges = watch('badges');
  const badgesErrors = formState.errors.badges;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-800">Badges</span>
        <Button
          variant="secondary"
          onClick={() => append({ label: '', tone: undefined })}
        >
          + Add
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-neutral-500">No badges</p>
      )}

      <ul className="flex flex-col gap-2">
        {fields.map((f, index) => {
          const badge = badges?.[index];
          const rowError = badgesErrors?.[index];
          return (
            <li
              key={f.id}
              className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white p-2"
            >
              <span
                className={`inline-flex min-w-14 justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  TONE_CLASS[badge?.tone ?? 'gray'] ?? DEFAULT_TONE
                }`}
              >
                {badge?.label || 'label'}
              </span>
              <Input
                placeholder="Label"
                aria-invalid={!!rowError?.label}
                {...register(`badges.${index}.label` as const)}
              />
              <Select {...register(`badges.${index}.tone` as const)}>
                <option value="">— tone —</option>
                {BADGE_TONES.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
              <Button variant="ghost" onClick={() => remove(index)}>
                ✕
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

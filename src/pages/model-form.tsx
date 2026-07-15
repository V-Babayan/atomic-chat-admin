import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { modelsClient } from '~/api';
import {
  ENGINES,
  ICON_PRESETS,
  mobileModelSchema,
  type MobileModel,
} from '~/schemas/model';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Field } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Select } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { BadgeArrayField } from '~/components/badge-array-field';
import { PlatformsField } from '~/components/platforms-field';
import { formatBytes } from '~/utils/format-bytes';

interface Props {
  mode: 'create' | 'edit';
}

const DEFAULT_VALUES: MobileModel = {
  id: '',
  name: '',
  description: '',
  size: undefined,
  iconUrl: 'custom',
  engine: 'llama',
  mmprojRemoteId: null,
  mmprojSize: undefined,
  forceCpu: false,
  supportsThinking: false,
  badges: [],
  platforms: ['ios', 'android'],
  isOnboarding: false,
};

export function ModelFormPage({ mode }: Props) {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const editingId = mode === 'edit' ? params.id : undefined;

  const [loading, setLoading] = useState(mode === 'edit');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<MobileModel>({
    resolver: zodResolver(mobileModelSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!editingId) return;
    modelsClient
      .get(editingId)
      .then(dto => reset(mobileModelSchema.parse(dto)))
      .catch(err =>
        setSubmitError(err instanceof Error ? err.message : 'Load failed'),
      )
      .finally(() => setLoading(false));
  }, [editingId, reset]);

  async function onSubmit(values: MobileModel) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (mode === 'edit' && editingId) {
        await modelsClient.update(editingId, values);
      } else {
        await modelsClient.create(values);
      }
      navigate('/models');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  }

  const sizeValue = watch('size');
  const mmprojSizeValue = watch('mmprojSize');

  if (loading) return <p className="text-sm text-neutral-500">Loading…</p>;

  return (
    <FormProvider {...methods}>
      <div className="mb-4 flex items-center gap-2">
        <Link
          to="/models"
          className="text-sm text-neutral-500 hover:text-neutral-800"
        >
          ← Back
        </Link>
        <span className="text-neutral-300">/</span>
        <h1 className="text-xl font-semibold">
          {mode === 'edit' ? 'Edit model' : 'New model'}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-2"
      >
        <Field
          label="ID (HF GGUF path)"
          hint="Example: unsloth/Qwen3.5-4B-GGUF/Qwen3.5-4B-Q4_K_M.gguf"
          error={errors.id?.message}
          className="md:col-span-2"
        >
          <Input
            {...register('id')}
            disabled={mode === 'edit'}
            placeholder="org/repo/file.gguf"
          />
        </Field>

        <Field label="Name" error={errors.name?.message}>
          <Input {...register('name')} placeholder="Qwen 3.5 (4B)" />
        </Field>

        <Field label="Engine" error={errors.engine?.message}>
          <Select {...register('engine')}>
            {ENGINES.map(e => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Description"
          error={errors.description?.message}
          className="md:col-span-2"
        >
          <Textarea {...register('description')} />
        </Field>

        <Field
          label="Size (bytes)"
          hint={sizeValue ? formatBytes(sizeValue) : 'Leave empty if unknown'}
          error={errors.size?.message}
        >
          <Input
            type="number"
            min={0}
            {...register('size', {
              setValueAs: v => (v === '' || v == null ? undefined : Number(v)),
            })}
          />
        </Field>

        <Field label="Icon preset" error={errors.iconUrl?.message}>
          <Select {...register('iconUrl')}>
            {ICON_PRESETS.map(k => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="mmproj remote ID"
          hint="Leave empty for models without vision"
          error={errors.mmprojRemoteId?.message}
        >
          <Input
            {...register('mmprojRemoteId', {
              setValueAs: v =>
                v === '' || v == null ? null : (v as string),
            })}
            placeholder="unsloth/Qwen3.5-4B-GGUF/mmproj-F16.gguf"
          />
        </Field>

        <Field
          label="mmproj size (bytes)"
          hint={
            mmprojSizeValue
              ? formatBytes(mmprojSizeValue)
              : 'Required when mmproj is set'
          }
          error={errors.mmprojSize?.message}
        >
          <Input
            type="number"
            min={0}
            {...register('mmprojSize', {
              setValueAs: v => (v === '' || v == null ? undefined : Number(v)),
            })}
          />
        </Field>

        <div className="flex flex-col gap-3 md:col-span-2">
          <PlatformsField />
          <div className="flex flex-wrap gap-6">
            <Checkbox
              id="supportsThinking"
              label="Supports thinking (reasoning chat template)"
              {...register('supportsThinking')}
            />
            <Checkbox
              id="forceCpu"
              label="Force CPU (n_gpu_layers: 0)"
              {...register('forceCpu')}
            />
            <Checkbox
              id="isOnboarding"
              label="Onboarding default"
              {...register('isOnboarding')}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <BadgeArrayField />
        </div>

        {submitError && (
          <div className="md:col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="md:col-span-2 flex justify-end gap-3">
          <Link to="/models">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting
              ? 'Saving…'
              : mode === 'edit'
                ? 'Save changes'
                : 'Create'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

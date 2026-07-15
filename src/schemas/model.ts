import { z } from 'zod';

export const ICON_PRESETS = [
  'google',
  'apple',
  'qwen',
  'huggingface',
  'dreamshaper',
  'realisticVision',
  'bonsai',
  'liquid',
  'custom',
] as const;
export type IconPreset = (typeof ICON_PRESETS)[number];

export const ENGINES = ['llama', 'apple', 'mlx', 'coreml-diffusion'] as const;
export type Engine = (typeof ENGINES)[number];

export const BADGE_TONES = [
  'purple',
  'green',
  'orange',
  'gray',
  'blue',
] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

export const PLATFORMS = ['ios', 'android'] as const;
export type Platform = (typeof PLATFORMS)[number];

export const badgeSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  tone: z.enum(BADGE_TONES).optional(),
});
export type Badge = z.infer<typeof badgeSchema>;

export const mobileModelSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  size: z
    .number()
    .int()
    .nonnegative('Size must be non-negative')
    .optional(),
  iconUrl: z.enum(ICON_PRESETS),
  engine: z.enum(ENGINES).default('llama'),
  mmprojRemoteId: z.string().nullable().default(null),
  mmprojSize: z
    .number()
    .int()
    .nonnegative('mmproj size must be non-negative')
    .optional(),
  forceCpu: z.boolean().optional(),
  supportsThinking: z.boolean().optional(),
  badges: z.array(badgeSchema).default([]),
  platforms: z
    .array(z.enum(PLATFORMS))
    .min(1, 'Pick at least one platform')
    .default(['ios', 'android']),
  isOnboarding: z.boolean().default(false),
});
export type MobileModel = z.infer<typeof mobileModelSchema>;

/**
 * Server-side envelope: DB-persisted fields on top of the declarative shape.
 */
export const mobileModelDtoSchema = mobileModelSchema.extend({
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type MobileModelDto = z.infer<typeof mobileModelDtoSchema>;

export const mobileModelListSchema = z.object({
  items: z.array(mobileModelDtoSchema),
});
export type MobileModelListResponse = z.infer<typeof mobileModelListSchema>;

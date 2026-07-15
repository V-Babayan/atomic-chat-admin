import type { MobileModel, MobileModelDto } from '~/schemas/model';
import {
  mobileModelDtoSchema,
  mobileModelListSchema,
} from '~/schemas/model';
import type { ModelsClient } from './types';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const TOKEN = import.meta.env.VITE_ADMIN_TOKEN ?? '';

async function request<T>(
  path: string,
  init: RequestInit & { parse?: (raw: unknown) => T } = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  const json: unknown = await res.json();
  // Backend wraps everything into { response: ... } (ApiEnvelopeDto).
  const payload =
    json && typeof json === 'object' && 'response' in json
      ? (json as { response: unknown }).response
      : json;
  return init.parse ? init.parse(payload) : (payload as T);
}

export const httpModelsClient: ModelsClient = {
  list: () =>
    request('/v1/admin/mobile-models', {
      parse: raw => mobileModelListSchema.parse(raw).items,
    }),
  get: id =>
    request(`/v1/admin/mobile-models/${encodeURIComponent(id)}`, {
      parse: raw => mobileModelDtoSchema.parse(raw),
    }),
  create: (payload: MobileModel) =>
    request<MobileModelDto>('/v1/admin/mobile-models', {
      method: 'POST',
      body: JSON.stringify(payload),
      parse: raw => mobileModelDtoSchema.parse(raw),
    }),
  update: (id: string, payload: MobileModel) =>
    request<MobileModelDto>(
      `/v1/admin/mobile-models/${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
        parse: raw => mobileModelDtoSchema.parse(raw),
      },
    ),
  remove: id =>
    request<void>(`/v1/admin/mobile-models/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
};

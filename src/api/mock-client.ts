import type { MobileModel, MobileModelDto } from '~/schemas/model';
import { SEED_MODELS } from './mock-seed';
import type { ModelsClient } from './types';

const STORAGE_KEY = 'atomic-admin.mock-models';

function load(): MobileModelDto[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MODELS));
    return SEED_MODELS.map(m => ({ ...m }));
  }
  try {
    return JSON.parse(raw) as MobileModelDto[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MODELS));
    return SEED_MODELS.map(m => ({ ...m }));
  }
}

function save(models: MobileModelDto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
}

async function delay<T>(value: T, ms = 120): Promise<T> {
  await new Promise(r => setTimeout(r, ms));
  return value;
}

export const mockModelsClient: ModelsClient = {
  async list() {
    return delay(load());
  },
  async get(id) {
    const found = load().find(m => m.id === id);
    if (!found) throw new Error(`Model not found: ${id}`);
    return delay(found);
  },
  async create(payload: MobileModel) {
    const list = load();
    if (list.some(m => m.id === payload.id)) {
      throw new Error(`Model with id "${payload.id}" already exists`);
    }
    const now = new Date().toISOString();
    const dto: MobileModelDto = { ...payload, createdAt: now, updatedAt: now };
    save([...list, dto]);
    return delay(dto);
  },
  async update(id: string, payload: MobileModel) {
    const list = load();
    const idx = list.findIndex(m => m.id === id);
    if (idx === -1) throw new Error(`Model not found: ${id}`);
    const prev = list[idx]!;
    const dto: MobileModelDto = {
      ...payload,
      createdAt: prev.createdAt,
      updatedAt: new Date().toISOString(),
    };
    const next = list.slice();
    next[idx] = dto;
    save(next);
    return delay(dto);
  },
  async remove(id) {
    const list = load();
    save(list.filter(m => m.id !== id));
    await delay(undefined);
  },
};

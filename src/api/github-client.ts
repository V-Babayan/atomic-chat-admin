import type { MobileModel, MobileModelDto } from '~/schemas/model';
import { mobileModelDtoSchema } from '~/schemas/model';
import type { ModelsClient } from './types';
import { getPat } from '~/lib/auth';

const OWNER = import.meta.env.VITE_DATA_REPO_OWNER;
const REPO = import.meta.env.VITE_DATA_REPO_NAME;
const PATH = import.meta.env.VITE_DATA_FILE_PATH ?? 'models.json';
const BRANCH = import.meta.env.VITE_DATA_BRANCH ?? 'main';

interface ContentsResponse {
  sha: string;
  content: string;
  encoding: 'base64';
}

function assertConfigured() {
  if (!OWNER || !REPO) {
    throw new Error(
      'GitHub data repo is not configured — set VITE_DATA_REPO_OWNER and VITE_DATA_REPO_NAME.',
    );
  }
}

async function gh<T>(
  path: string,
  init: RequestInit = {},
  { allow404 = false }: { allow404?: boolean } = {},
): Promise<T | null> {
  const pat = getPat();
  if (!pat) throw new Error('PAT not set. Sign in with your GitHub token.');

  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${pat}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (allow404 && res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return null;
  return (await res.json()) as T;
}

function b64encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function b64decode(input: string): string {
  const bin = atob(input.replace(/\n/g, ''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function fetchCatalog(): Promise<{
  items: MobileModelDto[];
  sha: string | null;
}> {
  assertConfigured();
  const file = await gh<ContentsResponse>(
    `/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(PATH)}?ref=${BRANCH}`,
    {},
    { allow404: true },
  );
  if (!file) return { items: [], sha: null };
  const json = JSON.parse(b64decode(file.content));
  const arr = Array.isArray(json) ? json : (json.items ?? []);
  const items = arr.map((raw: unknown) => mobileModelDtoSchema.parse(raw));
  return { items, sha: file.sha };
}

async function commit(
  items: MobileModelDto[],
  message: string,
  sha: string | null,
): Promise<void> {
  assertConfigured();
  const body: Record<string, unknown> = {
    message,
    content: b64encode(`${JSON.stringify(items, null, 2)}\n`),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  await gh<{ content: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(PATH)}`,
    { method: 'PUT', body: JSON.stringify(body) },
  );
}

async function mutate(
  message: string,
  mutator: (items: MobileModelDto[]) => MobileModelDto[],
): Promise<MobileModelDto[]> {
  // Two-attempt retry: refetch if the sha is stale (409/422).
  for (let attempt = 0; attempt < 2; attempt++) {
    const { items, sha } = await fetchCatalog();
    const next = mutator(items);
    try {
      await commit(next, message, sha);
      return next;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      if (attempt === 0 && /409|422|conflict|sha/i.test(errMsg)) continue;
      throw err;
    }
  }
  throw new Error('Failed to commit after retry');
}

export const githubModelsClient: ModelsClient = {
  async list() {
    const { items } = await fetchCatalog();
    return items;
  },
  async get(id) {
    const { items } = await fetchCatalog();
    const found = items.find(m => m.id === id);
    if (!found) throw new Error(`Model not found: ${id}`);
    return found;
  },
  async create(payload: MobileModel) {
    const now = new Date().toISOString();
    const dto: MobileModelDto = { ...payload, createdAt: now, updatedAt: now };
    await mutate(`admin: add ${payload.id}`, items => {
      if (items.some(m => m.id === payload.id)) {
        throw new Error(`Model with id "${payload.id}" already exists`);
      }
      return [...items, dto];
    });
    return dto;
  },
  async update(id: string, payload: MobileModel) {
    let updated!: MobileModelDto;
    await mutate(`admin: update ${id}`, items => {
      const idx = items.findIndex(m => m.id === id);
      if (idx === -1) throw new Error(`Model not found: ${id}`);
      const prev = items[idx]!;
      updated = {
        ...payload,
        createdAt: prev.createdAt,
        updatedAt: new Date().toISOString(),
      };
      const next = items.slice();
      next[idx] = updated;
      return next;
    });
    return updated;
  },
  async remove(id) {
    await mutate(`admin: remove ${id}`, items =>
      items.filter(m => m.id !== id),
    );
  },
};


import { githubModelsClient } from './github-client';
import { mockModelsClient } from './mock-client';
import type { ModelsClient } from './types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const modelsClient: ModelsClient = useMock
  ? mockModelsClient
  : githubModelsClient;

export type { ModelsClient } from './types';

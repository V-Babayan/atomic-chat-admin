import { httpModelsClient } from './client';
import { mockModelsClient } from './mock-client';
import type { ModelsClient } from './types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const modelsClient: ModelsClient = useMock
  ? mockModelsClient
  : httpModelsClient;

export type { ModelsClient } from './types';

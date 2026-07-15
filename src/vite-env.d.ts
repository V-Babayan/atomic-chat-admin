/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_USE_MOCK?: string;
  readonly VITE_DATA_REPO_OWNER?: string;
  readonly VITE_DATA_REPO_NAME?: string;
  readonly VITE_DATA_FILE_PATH?: string;
  readonly VITE_DATA_BRANCH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import type { MobileModel, MobileModelDto } from '~/schemas/model';

export interface ModelsClient {
  list(): Promise<MobileModelDto[]>;
  get(id: string): Promise<MobileModelDto>;
  create(payload: MobileModel): Promise<MobileModelDto>;
  update(id: string, payload: MobileModel): Promise<MobileModelDto>;
  remove(id: string): Promise<void>;
}

import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { EngineStatus } from '@/shared/const/EngineStatus';
import { type IEngine } from '../model/types';
import { type IRaceResult } from './types';

const createEngineParams = (id: number, status: EngineStatus) => {
  const params = new URLSearchParams();
  params.append('id', String(id));
  params.append('status', status);

  return params;
};

export const engineApi = {
  start: async (id: number) => {
    const params = createEngineParams(id, EngineStatus.STARTED);
    const response = await apiInstance.patch<IEngine>(routes.enginePath(), null, { params });
    return response.data;
  },
  stop: async (id: number) => {
    const params = createEngineParams(id, EngineStatus.STOPPED);
    const response = await apiInstance.patch<IEngine>(routes.enginePath(), null, { params });
    return response.data;
  },
  drive: async (id: number) => {
    const params = createEngineParams(id, EngineStatus.DRIVE);
    const response = await apiInstance.patch<IRaceResult>(routes.enginePath(), null, { params });
    return response.data;
  },
};

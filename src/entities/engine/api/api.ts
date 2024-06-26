import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { type IRaceResult, EngineQueryKeys } from './types';
import { type IEngine, EngineStatus } from '../model/types';

const createEngineParams = (id: number, status: EngineStatus) => {
  const params = new URLSearchParams();
  params.append(EngineQueryKeys.ID, String(id));
  params.append(EngineQueryKeys.STATUS, status);

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

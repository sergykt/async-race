import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { type IWinner } from '../model/types';
import { type IWinnerDto } from './types';

export const carApi = {
  get: async (id: number) => {
    const response = await apiInstance.get<IWinner>(routes.winnersPath(id));
    return response.data;
  },
  getAll: async () => {
    const response = await apiInstance.get<IWinner[]>(routes.winnersPath());
    return response.data;
  },
  create: async (body: IWinner) => {
    const response = await apiInstance.post<IWinner>(routes.winnersPath(), body);
    return response.data;
  },
  update: async (id: number, body: IWinnerDto) => {
    const response = await apiInstance.put<IWinner>(routes.winnersPath(id), body);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await apiInstance.delete<IWinner>(routes.winnersPath(id));
    return response.data;
  },
};

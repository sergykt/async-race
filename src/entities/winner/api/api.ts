import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { type IWinner } from '../model/types';
import { type IWinnerDto, type IWinnersParams } from './types';

export const winnerApi = {
  getWinner: async (id: number) => {
    const response = await apiInstance.get<IWinner>(routes.winnersPath(id));
    return response.data;
  },
  getWinners: async (props: IWinnersParams) => {
    const { limit, page, sort, order } = props;
    const params = new URLSearchParams();
    params.append('_limit', String(limit));
    params.append('_page', String(page));
    params.append('_sort', sort);
    params.append('_order', order);

    const response = await apiInstance.get<IWinner[]>(routes.winnersPath(), { params });
    const count = Number(response.headers['x-total-count']);
    return { results: response.data, count };
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

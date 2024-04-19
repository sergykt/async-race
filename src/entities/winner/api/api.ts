import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { PageQueryKeys } from '@/shared/lib/pagination';
import { OrderQueryKeys } from '@/shared/lib/sorting';
import { type IWinner } from '../model/types';
import { type IWinnerDto, type IWinnersParams } from './types';

const createWinnersParams = (props: IWinnersParams) => {
  const { limit, page, sort, order } = props;
  const params = new URLSearchParams();
  params.append(PageQueryKeys.LIMIT, String(limit));
  params.append(PageQueryKeys.PAGE, String(page));
  params.append(OrderQueryKeys.SORT, sort);
  params.append(OrderQueryKeys.ORDER, order);

  return params;
};

export const winnerApi = {
  getWinner: async (id: number) => {
    const response = await apiInstance.get<IWinner>(routes.winnersPath(id));
    return response.data;
  },
  getWinners: async (props: IWinnersParams) => {
    const params = createWinnersParams(props);
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

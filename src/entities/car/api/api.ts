import { apiInstance } from '@/shared/api/apiInstance';
import { routes } from '@/shared/api/routes';
import { PageQueryKeys } from '@/shared/lib/pagination';
import { type ICar } from '../model/types';
import { type ICarDto, type ICarParams } from './types';

const createCarsParams = (props: ICarParams) => {
  const { limit, page } = props;
  const params = new URLSearchParams();
  params.append(PageQueryKeys.LIMIT, String(limit));
  params.append(PageQueryKeys.PAGE, String(page));
  return params;
};

export const carApi = {
  getCar: async (id: number) => {
    const response = await apiInstance.get<ICar>(routes.garagePath(id));
    return response.data;
  },
  getCars: async (props: ICarParams) => {
    const params = createCarsParams(props);

    const response = await apiInstance.get<ICar[]>(routes.garagePath(), { params });
    const count = Number(response.headers['x-total-count']);
    return { results: response.data, count };
  },
  create: async (body: ICarDto) => {
    const response = await apiInstance.post<ICar>(routes.garagePath(), body);
    return response.data;
  },
  update: async (id: number, body: ICarDto) => {
    const response = await apiInstance.put<ICar>(routes.garagePath(id), body);
    return response.data;
  },
  delete: async (id: number) => {
    await apiInstance.delete<void>(routes.garagePath(id));
  },
};

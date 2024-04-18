import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { carApi, type ICarParams } from '@/entities/car';

export const useGetCars = (props: ICarParams) => {
  const { page, limit } = props;

  return useQuery({
    queryKey: ['cars', page, limit],
    queryFn: async () => {
      const response = carApi.getCars(props);

      return response;
    },
    placeholderData: keepPreviousData,
  });
};

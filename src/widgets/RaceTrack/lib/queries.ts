import { useQuery } from '@tanstack/react-query';
import { carApi } from '@/entities/car';

interface IUseGetCarsProps {
  page?: number;
  limit?: number;
}

export const useGetCars = (props: IUseGetCarsProps) => {
  const { page = 1, limit = 7 } = props;

  return useQuery({
    queryKey: ['cars', page, limit],
    queryFn: async () => {
      const response = carApi.getCars(page, limit);

      return response;
    },
  });
};

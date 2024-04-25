import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi } from '@/entities/car';
import { getRandomColor } from '@/shared/lib/getRandomColor';
import { getRandomCarName } from './getRandomCarName';

const defaultCount = 100;

export const useGenerateCars = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (count: number | void) => {
      const cars = Array.from({ length: count || defaultCount }, () => ({
        name: getRandomCarName(),
        color: getRandomColor(),
      }));

      await Promise.all(cars.map((car) => carApi.create(car)));
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

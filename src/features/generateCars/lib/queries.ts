import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi, type ICarDto } from '@/entities/car';
import { getRandomColor } from '@/shared/lib/getRandomColor';
import { getRandomCarName } from './getRandomCarName';

const numberOfCars = 100;

export const useGenerateCars = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const cars: ICarDto[] = [];
      for (let i = 0; i < numberOfCars; i += 1) {
        cars.push({
          name: getRandomCarName(),
          color: getRandomColor(),
        });
      }

      const carsPromises = cars.map((car) => carApi.create(car));
      await Promise.all(carsPromises);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

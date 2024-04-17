import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi, type ICarDto } from '@/entities/car';

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ICarDto) => carApi.create(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi } from '@/entities/car';

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return carApi.delete(id);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi } from '@/entities/car';
import { winnerApi } from '@/entities/winner';

export const useRemoveCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await carApi.delete(id);
      await winnerApi.delete(id);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

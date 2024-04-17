import { useQueryClient, useMutation } from '@tanstack/react-query';
import { carApi, type ICarDto } from '@/entities/car';

interface IUpdateCarProps {
  id: number;
  body: ICarDto;
}

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: IUpdateCarProps) => {
      const { id, body } = props;

      return carApi.update(id, body);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

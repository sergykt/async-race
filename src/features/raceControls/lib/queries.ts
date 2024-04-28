import { useQueryClient, useMutation } from '@tanstack/react-query';
import { winnerApi } from '@/entities/winner';

interface IUseCreateWinnerProps {
  id: number;
  newTime: number;
}

export const useCreateWinner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: IUseCreateWinnerProps) => {
      const { id, newTime } = props;
      const winner = await winnerApi.getWinner(id);

      if (winner) {
        const { wins, time } = winner;
        const updateTime = newTime < time ? newTime : time;
        await winnerApi.update(id, { wins: wins + 1, time: updateTime });
      } else {
        await winnerApi.create({ id, wins: 1, time: newTime });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['winners'] });
    },
  });
};

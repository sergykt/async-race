import { useQueryClient, useMutation } from '@tanstack/react-query';
import { winnerApi } from '@/entities/winner';

export interface IRaceWinnerSchema {
  id: number;
  time: number;
}

export const useCreateWinner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: IRaceWinnerSchema) => {
      const { id, time } = props;
      const winner = await winnerApi.getWinner(id);

      if (winner) {
        const { wins, time: prevTime } = winner;
        const updateTime = time < prevTime ? time : prevTime;
        await winnerApi.update(id, { wins: wins + 1, time: updateTime });
      } else {
        await winnerApi.create({ id, wins: 1, time });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['winners'] });
    },
  });
};

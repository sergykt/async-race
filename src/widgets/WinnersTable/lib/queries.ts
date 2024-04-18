import { useQuery } from '@tanstack/react-query';
import { winnerApi, type IWinnersParams } from '@/entities/winner';
import { carApi } from '@/entities/car';

export const useGetWinners = (props: IWinnersParams) => {
  const { page, limit, order, sort } = props;

  return useQuery({
    queryKey: ['winners', page, limit, order, sort],
    queryFn: async () => {
      const { results, count } = await winnerApi.getWinners(props);

      const extendedResultsPromises = results.map(async (winner) => {
        const { color, name } = await carApi.getCar(winner.id);
        return { ...winner, color, name };
      });

      const extendedResults = await Promise.all(extendedResultsPromises);

      return { results: extendedResults, count };
    },
  });
};

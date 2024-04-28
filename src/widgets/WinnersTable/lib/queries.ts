import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { winnerApi, type IWinnersParams } from '@/entities/winner';
import { carApi } from '@/entities/car';

export const useGetWinners = (props: IWinnersParams) => {
  const { page, limit, order, sort } = props;

  return useQuery({
    queryKey: ['winners', page, limit, order, sort],
    queryFn: async () => {
      const { results, count } = await winnerApi.getWinners(props);

      const extendedResults = await Promise.all(
        results.map(async (winner) => {
          const { color, name } = await carApi.getCar(winner.id);
          return { ...winner, color, name };
        }),
      );

      return { results: extendedResults, count };
    },
    placeholderData: keepPreviousData,
  });
};

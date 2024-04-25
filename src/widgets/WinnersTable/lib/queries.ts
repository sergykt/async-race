import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { winnerApi, type IWinnersParams } from '@/entities/winner';
import { carApi } from '@/entities/car';

export const useGetWinners = (props: IWinnersParams) => {
  const { page, limit, order, sort } = props;

  return useQuery({
    queryKey: ['winners', page, limit, order, sort],
    queryFn: async () => {
      try {
        const { results, count } = await winnerApi.getWinners(props);

        const extendedResults = await Promise.all(
          results.map(async (winner) => {
            const { color, name } = await carApi.getCar(winner.id);
            return { ...winner, color, name };
          }),
        );

        return { results: extendedResults, count };
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
          return { results: [], count: 0 };
        }
        throw err;
      }
    },
    placeholderData: keepPreviousData,
  });
};

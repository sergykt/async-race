import { memo, useEffect } from 'react';
import { WinnersSortBy } from '@/entities/winner';
import { usePagination, getPagesCount } from '@/shared/lib/pagination';
import { Pagination } from '@/shared/ui/Pagination';
import { useSortBy } from '@/shared/lib/sorting';
import { WinnersItem } from './WinnersItem';
import { WinnersTableHeader } from './WinnersTableHeader';
import { useGetWinners } from '../lib/queries';
import styles from './WinnersTable.module.scss';

export const WinnersTable = memo(() => {
  const { page, limit, setPage } = usePagination();
  const { sort, order, setSortBy } = useSortBy(WinnersSortBy, WinnersSortBy.TIME);

  const { data: { results = [], count = 0 } = {}, isFetched } = useGetWinners({
    page,
    limit,
    order,
    sort,
  });

  const pagesCount = getPagesCount(count, limit);

  useEffect(() => {
    if (isFetched && page > pagesCount) {
      setPage(pagesCount);
    }
  }, [isFetched, setPage, pagesCount, page]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <WinnersTableHeader setSortBy={setSortBy} sort={sort} />
        <tbody>
          {results.map(({ id, wins, time, color, name }) => (
            <WinnersItem key={id} id={id} wins={wins} time={time} color={color} name={name} />
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <p className={styles.count}>RECORDS: ({count})</p>
        <Pagination pagesCount={pagesCount} page={page} onPageChange={setPage} />
      </div>
    </div>
  );
});

import { memo, useEffect } from 'react';
import { usePagination, getPagesCount } from '@/shared/lib/pagination';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetWinners } from '../lib/queries';
import { WinnersItem } from './WinnersItem';
import styles from './WinnersTable.module.scss';

export const WinnersTable = memo(() => {
  const { page, limit, setPage } = usePagination();
  const { data: { results = [], count = 0 } = {}, isFetched } = useGetWinners({
    page,
    limit,
    order: 'DESC',
    sort: 'wins',
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
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (seconds)</th>
          </tr>
        </thead>
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

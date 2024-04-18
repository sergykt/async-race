import { memo } from 'react';
import { usePagination, getPagesCount } from '@/shared/lib/pagination';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetWinners } from '../lib/queries';
import { WinnersItem } from './WinnersItem';
import styles from './WinnersTable.module.scss';

export const WinnersTable = memo(() => {
  const { page, limit, setPage } = usePagination();

  const { data } = useGetWinners({ page, limit, order: 'DESC', sort: 'wins' });

  if (!data) {
    return null;
  }

  const { count, results } = data;

  const pagesCount = getPagesCount(data.count, limit);

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

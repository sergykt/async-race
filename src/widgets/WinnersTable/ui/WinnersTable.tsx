import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getPagesCount } from '@/shared/lib/getPagesCount';
import { Pagination } from '@/shared/ui/Pagination';
import { useStore } from '@/shared/lib/store';
import { WinnersItem } from './WinnersItem';
import { WinnersTableHeader } from './WinnersTableHeader';
import { useGetWinners } from '../lib/queries';
import styles from './WinnersTable.module.scss';

export const WinnersTable = observer(() => {
  const {
    winnersTableStore: { page, setPage, limit, sort, order, setSortBy },
  } = useStore();

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

import { memo } from 'react';
import { Pagination } from '@/shared/ui/Pagination';
import { usePagination, getPagesCount } from '@/shared/lib/pagination';
import { useGetCars } from '../lib/queries';
import { RaceTrackItem } from './RaceTrackItem';
import styles from './RaceTrack.module.scss';

export const RaceTrack = memo(() => {
  const { page, limit, setPage } = usePagination();

  const { data } = useGetCars({ page, limit });

  if (!data) {
    return null;
  }

  const { results, count } = data;

  const pagesCount = getPagesCount(count, limit);

  return (
    count && (
      <div className={styles.raceTrack}>
        <ul className={styles.list}>
          {results.map(({ id, color, name }) => (
            <RaceTrackItem name={name} color={color} key={id} />
          ))}
        </ul>
        <div className={styles.footer}>
          <p className={styles.count}>GARAGE ({count})</p>
          <Pagination page={page} pagesCount={pagesCount} onPageChange={setPage} />
        </div>
      </div>
    )
  );
});

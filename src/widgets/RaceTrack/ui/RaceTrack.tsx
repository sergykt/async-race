import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination } from '@/shared/ui/Pagination';
import { useStore } from '@/shared/lib/store';
import { getPagesCount } from '@/shared/lib/getPagesCount';
import { useGetCars } from '../lib/queries';
import { RaceTrackItem } from './RaceTrackItem';
import styles from './RaceTrack.module.scss';

export const RaceTrack = observer(() => {
  const {
    raceTrackStore: { page, limit, setPage },
  } = useStore();
  const { data: { results = [], count = 0 } = {}, isFetched } = useGetCars({ page, limit });

  const pagesCount = getPagesCount(count, limit);

  useEffect(() => {
    if (isFetched && page > pagesCount) {
      setPage(pagesCount);
    }
  }, [isFetched, setPage, pagesCount, page]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {results.map(({ id, color, name }) => (
          <RaceTrackItem name={name} color={color} id={id} key={id} />
        ))}
      </ul>
      <div className={styles.footer}>
        <p className={styles.count}>GARAGE ({count})</p>
        <Pagination page={page} pagesCount={pagesCount} onPageChange={setPage} />
      </div>
    </div>
  );
});

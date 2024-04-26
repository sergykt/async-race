import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination } from '@/shared/ui/Pagination';
import { useStore } from '@/shared/lib/store';
import { getPagesCount } from '@/shared/lib/getPagesCount';
import { usePageValidation } from '@/shared/lib/usePageValidation';
import { useGetCars } from '../lib/queries';
import { RaceTrackItem } from './RaceTrackItem';
import styles from './RaceTrack.module.scss';

export const RaceTrack = observer(() => {
  const {
    raceTrackStore: { page, limit, setPage, selectCar, resetSelection, selectedCarId },
    engineStore: { getEngine },
  } = useStore();
  const { data: { results = [], count = 0 } = {}, isFetched } = useGetCars({ page, limit });

  const pagesCount = getPagesCount(count, limit);
  usePageValidation({ isFetched, page, pagesCount, setPage });

  const removeCallback = useCallback(
    (selected: boolean) => {
      if (selected) resetSelection();
    },
    [resetSelection],
  );

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {results.map((car) => (
          <RaceTrackItem
            car={car}
            key={car.id}
            selected={selectedCarId === car.id}
            selectCar={selectCar}
            removeCallback={removeCallback}
            engine={getEngine(car.id)}
          />
        ))}
      </ul>
      <div className={styles.footer}>
        <p className={styles.count}>GARAGE ({count})</p>
        <Pagination page={page} pagesCount={pagesCount} onPageChange={setPage} />
      </div>
    </div>
  );
});

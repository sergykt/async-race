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
    raceTrackStore: { page, limit, setPage },
    managePanelStore: { selectedCarId, selectCar, resetSelection },
  } = useStore();

  const { data: { results = [], count = 0 } = {}, isFetched } = useGetCars({ page, limit });

  const pagesCount = getPagesCount(count, limit);
  usePageValidation({ isFetched, page, pagesCount, setPage });

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {results.map((car) => (
          <RaceTrackItem
            car={car}
            selected={selectedCarId === car.id}
            selectCar={selectCar}
            resetSelection={resetSelection}
            key={car.id}
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

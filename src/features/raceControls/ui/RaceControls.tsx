import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { IoPlayOutline } from 'react-icons/io5';
import { RxReset } from 'react-icons/rx';
import { Button } from '@/shared/ui/Button';
import { useStore } from '@/shared/lib/store';
import styles from './RaceControls.module.scss';

export const RaceControls: FC = observer(() => {
  const {
    engineStore: { startRace, resetRace },
  } = useStore();

  const handleStartRace = () => {
    startRace().catch((err) => console.error(err));
  };

  const handleReset = () => {
    resetRace().catch((err) => console.error(err));
  };

  return (
    <div className={styles.raceControls}>
      <Button className={styles.race} onClick={handleStartRace}>
        Race <IoPlayOutline />
      </Button>
      <Button className={styles.reset} onClick={handleReset}>
        Reset <RxReset />
      </Button>
    </div>
  );
});

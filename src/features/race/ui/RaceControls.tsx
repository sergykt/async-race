import { type FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IoPlayOutline } from 'react-icons/io5';
import { RxReset } from 'react-icons/rx';
import { carApi } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { useStore } from '@/shared/lib/store';
import { useModal } from '@/shared/lib/useModal';
import { useCreateWinner } from '../lib/queries';
import styles from './RaceControls.module.scss';
import { RaceWinnerModal } from './RaceWinnerModal';

interface IRaceWinner {
  name: string;
  time: number;
}

export const RaceControls: FC = observer(() => {
  const {
    engineStore: { startRace, resetRace, enginesReady },
  } = useStore();
  const { mutate } = useCreateWinner();
  const { open, close, isOpen } = useModal();
  const [raceWinner, setRaceWinner] = useState<IRaceWinner | null>(null);

  const handleStartRace = async () => {
    const winner = await startRace();
    const winnerCar = await carApi.getCar(winner.id);
    mutate(winner);
    setRaceWinner({ name: winnerCar.name, time: winner.time });
    open();
  };

  const handleStartRaceSync = () => {
    handleStartRace().catch((err) => console.error(err));
  };
  const handleReset = () => {
    resetRace().catch((err) => console.error(err));
  };

  return (
    <div className={styles.raceControls}>
      <Button className={styles.race} onClick={handleStartRaceSync} disabled={!enginesReady}>
        Race <IoPlayOutline />
      </Button>
      <Button className={styles.reset} onClick={handleReset} disabled={enginesReady}>
        Reset <RxReset />
      </Button>
      <RaceWinnerModal
        isOpen={isOpen}
        winner={raceWinner?.name ?? ''}
        time={raceWinner?.time ?? 0}
        onClose={close}
      />
    </div>
  );
});

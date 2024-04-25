import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { EngineStatus } from '@/entities/engine';
import { useStore } from '@/shared/lib/store';
import { Button } from '@/shared/ui/Button';
import styles from './EngineControls.module.scss';

interface IEngineControlsProps {
  id: number;
}

export const EngineControls: FC<IEngineControlsProps> = observer(({ id }) => {
  const {
    engineStore: { enginePosition, drive, stop },
  } = useStore();

  const handleStart = () => {
    drive(id).catch((err) => console.error(err));
  };

  const handleStop = () => {
    stop(id).catch((err) => console.error(err));
  };

  return (
    <div className={styles.engineControls}>
      <Button
        size='small'
        className={styles.start}
        onClick={handleStart}
        disabled={
          enginePosition[id] === EngineStatus.STARTED || enginePosition[id] === EngineStatus.DRIVE
        }
      >
        A
      </Button>
      <Button
        size='small'
        className={styles.stop}
        onClick={handleStop}
        disabled={!enginePosition[id] || enginePosition[id] === EngineStatus.STOPPED}
      >
        B
      </Button>
    </div>
  );
});

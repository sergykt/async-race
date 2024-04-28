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
    engineStore: { getEngineStatus, drive, stop },
  } = useStore();
  const engineStatus = getEngineStatus(id);

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
        disabled={engineStatus === EngineStatus.PENDING || engineStatus !== EngineStatus.STOPPED}
      >
        A
      </Button>
      <Button
        size='small'
        className={styles.stop}
        onClick={handleStop}
        disabled={engineStatus === EngineStatus.STOPPED}
      >
        B
      </Button>
    </div>
  );
});

import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { engineApi } from '@/entities/engine/api/api';
import { Button } from '@/shared/ui/Button';
import styles from './EngineControls.module.scss';

interface IEngineControlsProps {
  id: number;
}

export const EngineControls: FC<IEngineControlsProps> = observer(({ id }) => {
  const handleStart = () => {
    engineApi.start(id).catch((err) => console.error(err));
  };

  const handleStop = () => {
    engineApi.stop(id).catch((err) => console.error(err));
  };

  return (
    <div className={styles.engineControls}>
      <Button size='small' className={styles.start} onClick={handleStart}>
        A
      </Button>
      <Button size='small' className={styles.stop} onClick={handleStop}>
        B
      </Button>
    </div>
  );
});

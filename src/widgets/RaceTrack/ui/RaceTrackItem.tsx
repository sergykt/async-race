import { type FC, useCallback, memo } from 'react';
import { AnimatedCar } from '@/features/carAnimation';
import { RemoveCarButton } from '@/features/removeCar';
import { EngineControls } from '@/features/engineControls';
import { type ICar } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import styles from './RaceTrackItem.module.scss';

interface IRaceBoardItemProps {
  car: ICar;
  selected: boolean;
  selectCar: (id: number, car: ICar) => void;
  resetSelection: () => void;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = memo((props) => {
  const { car, selected, selectCar, resetSelection } = props;
  const { id, name, color } = car;

  const selectCarCallback = useCallback(() => selectCar(id, car), [id, car, selectCar]);

  const removeCallback = useCallback(() => {
    if (selected) {
      resetSelection();
    }
  }, [selected, resetSelection]);

  return (
    <li className={styles.item}>
      <div className={styles.buttonGroup}>
        <Button size='small' onClick={selectCarCallback}>
          Select
        </Button>
        <RemoveCarButton id={id} callback={removeCallback} />
      </div>
      <EngineControls id={id} />
      <div className={styles.track}>
        <p className={styles.name}>{name}</p>
        <AnimatedCar id={id} color={color} width={70} height={36} />
      </div>
    </li>
  );
});

import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RemoveCarButton } from '@/features/removeCar';
import { EngineControls } from '@/features/engineControls';
import { type IEngineFull } from '@/entities/engine';
import { type ICar, type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import styles from './RaceTrackItem.module.scss';
import { AnimatedCar } from './AnimatedCar';

interface IRaceBoardItemProps {
  car: ICar;
  selectCar: (id: number, body: ICarDto) => void;
  selected: boolean;
  removeCallback: (selected: boolean) => void;
  engine: IEngineFull;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = observer((props) => {
  const {
    car: { name, color, id },
    selectCar,
    selected,
    removeCallback,
    engine,
  } = props;

  return (
    <li className={styles.item}>
      <div className={styles.buttonGroup}>
        <Button size='small' onClick={() => selectCar(id, { color, name })}>
          Select
        </Button>
        <RemoveCarButton id={id} callback={() => removeCallback(selected)} />
      </div>
      <EngineControls id={id} />
      <AnimatedCar engine={engine} color={color} id={id} />
      <p className={styles.name}>{name}</p>
    </li>
  );
});

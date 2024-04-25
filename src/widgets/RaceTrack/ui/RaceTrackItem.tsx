import { type FC, memo } from 'react';
import { RemoveCarButton } from '@/features/removeCar';
import { EngineControls } from '@/features/engineControls';
import { type ICar, type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import styles from './RaceTrackItem.module.scss';

interface IRaceBoardItemProps {
  car: ICar;
  selectCar: (id: number, body: ICarDto) => void;
  selected: boolean;
  removeCallback: (selected: boolean) => void;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = memo((props) => {
  const {
    car: { name, color, id },
    selectCar,
    selected,
    removeCallback,
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
      <CarSvg className={styles.car} fill={color} width={70} height={36} />
      <p className={styles.name}>{name}</p>
    </li>
  );
});

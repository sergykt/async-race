import { type FC, memo } from 'react';
import { RemoveCarButton } from '@/features/removeCar';
import { EngineControls } from '@/features/engineControls';
import { IEngineFull } from '@/entities/engine';
import { type ICarDto, type ICar } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import styles from './RaceTrackItem.module.scss';
import { AnimatedCar } from './AnimatedCar';

interface IRaceBoardItemProps {
  car: ICar;
  selectCar: (id: number, values: ICarDto) => void;
  resetSelection: () => void;
  selected: boolean;
  engine: IEngineFull | null;
  getCarPosition: (id: number) => React.CSSProperties;
  setCarPosition: (id: number, style: React.CSSProperties) => void;
  resetCarPosition: (id: number) => void;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = memo((props) => {
  const {
    car: { name, color, id },
    selectCar,
    resetSelection,
    selected,
    engine,
    getCarPosition,
    resetCarPosition,
    setCarPosition,
  } = props;

  const removeCallback = () => {
    if (selected) {
      resetSelection();
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.buttonGroup}>
        <Button size='small' onClick={() => selectCar(id, { color, name })}>
          Select
        </Button>
        <RemoveCarButton id={id} callback={removeCallback} />
      </div>
      <EngineControls id={id} />
      <AnimatedCar
        id={id}
        color={color}
        engine={engine}
        getCarPosition={getCarPosition}
        setCarPosition={setCarPosition}
        resetCarPosition={resetCarPosition}
      />
      <p className={styles.name}>{name}</p>
    </li>
  );
});

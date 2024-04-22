import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { DeleteCarButton } from '@/features/deleteCar/ui/DeleteCarButton';
import { useStore } from '@/shared/lib/store';
import { Button } from '@/shared/ui/Button';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import styles from './RaceTrackItem.module.scss';

interface IRaceBoardItemProps {
  color: string;
  name: string;
  id: number;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = observer((props) => {
  const { color, name, id } = props;
  const {
    managePanelStore: { selectedCarId, selectCar, resetSelection },
  } = useStore();

  const deleteCarCallback = () => {
    if (selectedCarId === id) {
      resetSelection();
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.buttonGroup}>
        <Button
          size='small'
          onClick={() => {
            selectCar(id, { name, color });
          }}
        >
          Select
        </Button>
        <DeleteCarButton id={id} callback={deleteCarCallback} />
      </div>
      <CarSvg className={styles.car} fill={color} width={100} height={35} />
      <p className={styles.name}>{name}</p>
    </li>
  );
});

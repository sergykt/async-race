import { type FC } from 'react';
import CarSvg from '@/shared/assets/img/car.svg?react';
import styles from './RaceTrackItem.module.scss';

interface IRaceBoardItemProps {
  color: string;
  name: string;
}

export const RaceTrackItem: FC<IRaceBoardItemProps> = (props) => {
  const { color, name } = props;

  return (
    <li className={styles.item}>
      <CarSvg fill={color} width={100} height={35} />
      <p className={styles.name}>{name}</p>
    </li>
  );
};

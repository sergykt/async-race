import { type FC, memo } from 'react';
import CarSvg from '@/shared/assets/svg/car.svg?react';

interface IWinnersItemProps {
  id: number;
  wins: number;
  time: number;
  color: string;
  name: string;
}

export const WinnersItem: FC<IWinnersItemProps> = memo((props) => {
  const { id, wins, time, color, name } = props;

  return (
    <tr>
      <td>{id}</td>
      <td>
        <CarSvg fill={color} width={70} height={36} />
      </td>
      <td>{name}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
});

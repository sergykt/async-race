import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useStore } from '@/shared/lib/store';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import styles from './AnimatedCar.module.scss';
import { useAnimation } from '../lib/useAnimation';

interface IAnimatedCarProps {
  id: number;
  color: string;
  width: number;
  height: number;
}

export const AnimatedCar: FC<IAnimatedCarProps> = observer((props) => {
  const { id, color, width, height } = props;
  const {
    animatedCarStore: { getCarPosition, setCarPosition, getStopFn, setStopFn },
    engineStore: { getEngine },
  } = useStore();

  const defaultStyle = {
    right: `calc(100% - ${width}px)`,
  };

  const carPosition = toJS(getCarPosition(id)) ?? defaultStyle;
  const engine = getEngine(id);

  useAnimation({
    id,
    engine,
    setCarPosition,
    setStopFn,
    getStopFn,
    startPosition: width,
  });

  return (
    <div className={styles.car} style={carPosition}>
      <CarSvg fill={color} width={width} height={height} />
    </div>
  );
});

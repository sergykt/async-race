import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { EngineStatus } from '@/entities/engine';
import { useStore } from '@/shared/lib/store';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import styles from './AnimatedCar.module.scss';
import { useAnimation } from '../lib/useAnimation';

interface IAnimatedCarProps {
  id: number;
  color: string;
  width: number;
  height: number;
  leftPadding: number;
}

export const AnimatedCar: FC<IAnimatedCarProps> = observer((props) => {
  const { id, color, width, height, leftPadding } = props;
  const {
    animatedCarStore: { getCarPosition, setCarPosition, getStopFn, setStopFn },
    engineStore: { getEngine, getEngineStatus },
  } = useStore();

  const startPosition = leftPadding + width;
  const defaultStyle = {
    right: `calc(100% - ${startPosition}px)`,
    transition: 'right 0.3s ease',
  };

  const carPosition = toJS(getCarPosition(id));
  const engine = getEngine(id);
  const engineStatus = getEngineStatus(id);

  useAnimation({
    id,
    engine,
    setCarPosition,
    setStopFn,
    getStopFn,
    startPosition,
  });

  const carStyle =
    engineStatus === EngineStatus.STOPPED || !carPosition ? defaultStyle : carPosition;

  return (
    <div className={styles.car} style={carStyle}>
      <CarSvg fill={color} width={width} height={height} />
    </div>
  );
});

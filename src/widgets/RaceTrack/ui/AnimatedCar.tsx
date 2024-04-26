import { useState, useRef, useEffect, type FC, memo } from 'react';
import { IEngineFull, EngineStatus } from '@/entities/engine';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import { animateWithDuration, carWidth, carHeight, carStartPositionStyle } from '../lib/animation';
import styles from './AnimatedCar.module.scss';

interface IAnimatedCarProps {
  engine: IEngineFull;
  color: string;
  id: number;
}

export const AnimatedCar: FC<IAnimatedCarProps> = memo((props) => {
  const [carStyle, setCarStyle] = useState<React.CSSProperties>(carStartPositionStyle);
  const { engine, color } = props;
  const stopFn = useRef(() => {});

  useEffect(() => {
    if (!engine) {
      return;
    }
    const { status, velocity, distance } = engine;
    const duration = distance / velocity;
    switch (status) {
      case EngineStatus.STARTED:
        stopFn.current = animateWithDuration(duration, setCarStyle);
        break;
      case EngineStatus.STOPPED:
        stopFn.current();
        setCarStyle(carStartPositionStyle);
        break;
      case EngineStatus.BROKEN:
        stopFn.current();
        break;
      default:
        break;
    }
  }, [engine]);

  return (
    <div className={styles.car} style={carStyle}>
      <CarSvg fill={color} width={carWidth} height={carHeight} />
    </div>
  );
});

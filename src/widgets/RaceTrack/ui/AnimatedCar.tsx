import { useRef, useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { EngineStatus, type IEngineFull } from '@/entities/engine';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import { animateWithDuration, carWidth, carHeight } from '../lib/animation';
import styles from './AnimatedCar.module.scss';

interface IAnimatedCarProps {
  id: number;
  color: string;
  engine: IEngineFull | null;
  getCarPosition: (id: number) => React.CSSProperties;
  setCarPosition: (id: number, style: React.CSSProperties) => void;
  resetCarPosition: (id: number) => void;
}

export const AnimatedCar: FC<IAnimatedCarProps> = observer((props) => {
  const { color, id, engine, getCarPosition, setCarPosition, resetCarPosition } = props;
  const carPosition = toJS(getCarPosition(id));
  const stopFn = useRef(() => {});

  useEffect(() => {
    if (!engine) {
      return;
    }

    const { status, velocity, distance } = engine;
    const duration = distance / velocity;

    switch (status) {
      case EngineStatus.STARTED:
        stopFn.current = animateWithDuration(duration, (newPosition) =>
          setCarPosition(id, newPosition),
        );
        break;
      case EngineStatus.STOPPED:
        stopFn.current();
        resetCarPosition(id);
        break;
      case EngineStatus.BROKEN:
        stopFn.current();
        break;
      default:
        break;
    }
  }, [engine, id, setCarPosition, resetCarPosition]);

  return (
    <div className={styles.car} style={carPosition}>
      <CarSvg fill={color} width={carWidth} height={carHeight} />
    </div>
  );
});

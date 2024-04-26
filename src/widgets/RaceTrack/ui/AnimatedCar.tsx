import { useRef, useEffect, type FC } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IEngineFull, EngineStatus } from '@/entities/engine';
import { useStore } from '@/shared/lib/store';
import CarSvg from '@/shared/assets/svg/car.svg?react';
import { animateWithDuration, carWidth, carHeight } from '../lib/animation';
import styles from './AnimatedCar.module.scss';

interface IAnimatedCarProps {
  engine: IEngineFull;
  color: string;
  id: number;
}

export const AnimatedCar: FC<IAnimatedCarProps> = observer((props) => {
  const {
    raceTrackStore: { getCarStyle, setCarStyle, resetCarStyle },
  } = useStore();
  const { engine, color, id } = props;
  const carStyle = toJS(getCarStyle(id));
  const stopFn = useRef(() => {});

  useEffect(() => {
    if (!engine) {
      return;
    }
    const { status, velocity, distance } = engine;
    const duration = distance / velocity;
    switch (status) {
      case EngineStatus.STARTED:
        stopFn.current = animateWithDuration(duration, (newStyle) => setCarStyle(id, newStyle));
        break;
      case EngineStatus.STOPPED:
        stopFn.current();
        resetCarStyle(id);
        break;
      case EngineStatus.BROKEN:
        stopFn.current();
        break;
      default:
        break;
    }
  }, [engine, id, setCarStyle, resetCarStyle]);

  return (
    <div className={styles.car} style={carStyle}>
      <CarSvg fill={color} width={carWidth} height={carHeight} />
    </div>
  );
});

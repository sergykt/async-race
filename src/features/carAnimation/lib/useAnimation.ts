import { useEffect } from 'react';
import { type IEngineFull, EngineStatus } from '@/entities/engine';
import { animateWithDuration } from './animation';

interface IUseAnimationProps {
  id: number;
  engine?: IEngineFull;
  startPosition: number;
  setCarPosition: (id: number, position: React.CSSProperties) => void;
  setStopFn: (id: number, stopFn: () => void) => void;
  getStopFn: (id: number) => () => void;
}

export const useAnimation = (props: IUseAnimationProps) => {
  const { id, engine, setCarPosition, setStopFn, getStopFn, startPosition } = props;

  useEffect(() => {
    if (!engine) {
      return;
    }

    const stopFn = getStopFn(id);
    const { status, velocity, distance } = engine;
    const duration = distance / velocity;
    const animationCallback = (position: React.CSSProperties) => setCarPosition(id, position);

    switch (status) {
      case EngineStatus.STARTED:
        setStopFn(id, animateWithDuration(duration, startPosition, animationCallback));
        break;
      case EngineStatus.STOPPED:
        stopFn();
        setCarPosition(id, {
          right: `calc(100% - ${startPosition}px)`,
        });
        break;
      case EngineStatus.BROKEN:
        stopFn();
        break;
      default:
        break;
    }
  }, [engine, id, setCarPosition, setStopFn, getStopFn, startPosition]);
};

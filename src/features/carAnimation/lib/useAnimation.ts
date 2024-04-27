import { useEffect } from 'react';
import { type IEngineFull, EngineStatus } from '@/entities/engine';
import { animateWithDuration } from './animation';

interface IUseAnimationProps {
  id: number;
  engine: IEngineFull | null;
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

    switch (status) {
      case EngineStatus.STARTED:
        setStopFn(
          id,
          animateWithDuration(duration, startPosition, (position) => setCarPosition(id, position)),
        );
        break;
      case EngineStatus.STOPPED:
        stopFn();
        break;
      case EngineStatus.BROKEN:
        stopFn();
        break;
      default:
        break;
    }
  }, [engine, id, setCarPosition, setStopFn, getStopFn, startPosition]);
};

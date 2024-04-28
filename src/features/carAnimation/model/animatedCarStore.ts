import { makeAutoObservable } from 'mobx';

export class AnimatedCarStore {
  carPositions: Record<string, React.CSSProperties> = {};

  stopFns: Record<string, () => void> = {};

  constructor() {
    makeAutoObservable(this);
  }

  getCarPosition = (id: number) => {
    return this.carPositions[id];
  };

  setCarPosition = (id: number, position: React.CSSProperties) => {
    this.carPositions[id] = position;
  };

  getStopFn = (id: number) => {
    return this.stopFns[id] ?? (() => {});
  };

  setStopFn = (id: number, fn: () => void) => {
    this.stopFns[id] = fn;
  };
}

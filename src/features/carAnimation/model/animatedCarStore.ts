import { makeAutoObservable } from 'mobx';

export class AnimatedCarStore {
  carPositions = new Map<number, React.CSSProperties>();

  stopFns = new Map<number, () => void>();

  constructor() {
    makeAutoObservable(this);
  }

  getCarPosition = (id: number) => {
    return this.carPositions.get(id);
  };

  setCarPosition = (id: number, position: React.CSSProperties) => {
    this.carPositions.set(id, position);
  };

  getStopFn = (id: number) => {
    return this.stopFns.get(id) ?? (() => {});
  };

  setStopFn = (id: number, fn: () => void) => {
    this.stopFns.set(id, fn);
  };
}

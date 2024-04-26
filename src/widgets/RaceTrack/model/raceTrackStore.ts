import { makeAutoObservable } from 'mobx';
import { carStartPositionStyle } from '../lib/animation';

export class RaceTrackStore {
  page = 1;

  limit = 7;

  carsStyles: Record<string, React.CSSProperties> = {};

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number) => {
    this.page = page;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };

  getCarPosition = (id: number) => {
    return this.carsStyles[id] ?? carStartPositionStyle;
  };

  setCarPosition = (id: number, style: React.CSSProperties) => {
    this.carsStyles[id] = style;
  };

  resetCarPosition = (id: number) => {
    this.carsStyles[id] = carStartPositionStyle;
  };
}

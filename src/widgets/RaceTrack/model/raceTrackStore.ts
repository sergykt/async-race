import { makeAutoObservable } from 'mobx';

export class RaceTrackStore {
  page = 1;

  limit = 7;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number) => {
    this.page = page;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };
}

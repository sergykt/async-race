import { makeAutoObservable, runInAction } from 'mobx';
import { IEngine, EngineStatus } from './types';
import { engineApi } from '../api/api';

export class EngineStore {
  engines: Record<string, IEngine> = {};

  enginePosition: Record<string, EngineStatus> = {};

  constructor() {
    makeAutoObservable(this);
  }

  start = async (id: number) => {
    this.enginePosition[id] = EngineStatus.STARTED;

    try {
      const engine = await engineApi.start(id);

      runInAction(() => {
        this.engines[id] = engine;
      });
    } catch (err) {
      this.enginePosition[id] = EngineStatus.STOPPED;
    }
  };

  stop = async (id: number) => {
    try {
      const engine = await engineApi.stop(id);

      runInAction(() => {
        this.engines[id] = engine;
        this.enginePosition[id] = EngineStatus.STOPPED;
      });
    } catch (err) {
      console.error(err);
    }
  };

  drive = async (id: number) => {
    await this.start(id);
    await engineApi.drive(id);
  };
}

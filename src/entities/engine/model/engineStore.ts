import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { type IEngineFull, EngineStatus } from './types';
import { engineApi } from '../api/api';

export class EngineStore {
  engines: Record<string, IEngineFull> = {};

  constructor() {
    makeAutoObservable(this);
  }

  getEngine = (id: number) => {
    return this.engines[id];
  };

  getEngineStatus = (id: number) => {
    return this.engines[id]?.status ?? EngineStatus.STOPPED;
  };

  start = async (id: number) => {
    try {
      const engine = await engineApi.start(id);
      runInAction(() => {
        this.engines[id] = { ...this.engines[id], ...engine, status: EngineStatus.STARTED };
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof AxiosError && err.response?.status === 404) {
          this.deleteEngine(id);
        }
      });

      throw err;
    }
  };

  stop = async (id: number) => {
    try {
      const engine = await engineApi.stop(id);
      runInAction(() => {
        this.engines[id] = { ...this.engines[id], ...engine, status: EngineStatus.STOPPED };
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof AxiosError && err.response?.status === 404) {
          this.deleteEngine(id);
        }
      });

      throw err;
    }
  };

  drive = async (id: number) => {
    try {
      await this.start(id);
      runInAction(() => {
        this.engines[id] = { ...this.engines[id], status: EngineStatus.DRIVE };
      });
      await engineApi.drive(id);
    } catch (err) {
      runInAction(() => {
        if (this.engines[id].status === EngineStatus.DRIVE) {
          this.engines[id] = { ...this.engines[id], status: EngineStatus.BROKEN };
        }
      });

      throw err;
    }
  };

  deleteEngine = (id: number) => {
    delete this.engines[id];
  };
}

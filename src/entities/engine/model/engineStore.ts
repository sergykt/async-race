import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { type IEngineFull, type IEngine, EngineStatus } from './types';
import { engineApi } from '../api/api';

export class EngineStore {
  engines: Record<string, IEngineFull> = {};

  selectedEngines: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getEngine = (id: number) => {
    return this.engines[id];
  };

  getEngineStatus = (id: number) => {
    return this.engines[id]?.status ?? EngineStatus.STOPPED;
  };

  setSelectedEngines = (ids: number[]) => {
    this.selectedEngines = ids;
  };

  get enginesReady() {
    const engineStatuses = this.selectedEngines.map((id) => this.getEngineStatus(id));

    return engineStatuses.every((status) => status === EngineStatus.STOPPED);
  }

  start = async (id: number) => {
    try {
      this.updateEngineStatus(id, EngineStatus.PENDING);
      const engine = await engineApi.start(id);
      this.updateEngine(id, engine, EngineStatus.STARTED);

      return engine;
    } catch (err) {
      runInAction(() => {
        if (err instanceof AxiosError && err.response?.status === 404) {
          this.deleteEngine(id);
        } else {
          this.updateEngineStatus(id, EngineStatus.STOPPED);
        }
      });

      throw err;
    }
  };

  stop = async (id: number) => {
    const prevStatus = this.getEngineStatus(id);
    try {
      const engine = await engineApi.stop(id);
      this.updateEngine(id, engine, EngineStatus.STOPPED);

      return engine;
    } catch (err) {
      runInAction(() => {
        if (err instanceof AxiosError && err.response?.status === 404) {
          this.deleteEngine(id);
        } else {
          this.updateEngineStatus(id, prevStatus);
        }
      });

      throw err;
    }
  };

  drive = async (id: number) => {
    try {
      const { velocity, distance } = await this.start(id);
      const time = parseFloat((distance / velocity / 1000).toFixed(3));
      this.updateEngineStatus(id, EngineStatus.DRIVE);
      await engineApi.drive(id);

      return { id, time };
    } catch (err) {
      if (this.engines[id].status === EngineStatus.DRIVE) {
        this.updateEngineStatus(id, EngineStatus.BROKEN);
      }

      throw err;
    }
  };

  startRace = async () => {
    const startPromises = this.selectedEngines.map((id) => this.drive(id));
    const winner = await Promise.any(startPromises);

    return winner;
  };

  resetRace = async () => {
    const resetSelectedEngines = this.selectedEngines.map((id) => this.stop(id));
    await Promise.all(resetSelectedEngines);
  };

  private deleteEngine = (id: number) => {
    runInAction(() => {
      delete this.engines[id];
    });
  };

  private updateEngine = (id: number, engine: IEngine, status: EngineStatus) => {
    runInAction(() => {
      this.engines[id] = { ...this.engines[id], ...engine, status };
    });
  };

  private updateEngineStatus = (id: number, status: EngineStatus) => {
    runInAction(() => {
      this.engines[id] = { ...this.engines[id], status };
    });
  };
}

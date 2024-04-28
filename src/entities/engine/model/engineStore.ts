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

  start = async (id: number) => {
    try {
      this.updateEngineStatus(id, EngineStatus.PENDING);
      const engine = await engineApi.start(id);
      this.updateEngine(id, engine, EngineStatus.STARTED);
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
      await this.start(id);
      this.updateEngineStatus(id, EngineStatus.DRIVE);
      await engineApi.drive(id);

      return id;
    } catch (err) {
      if (this.engines[id].status === EngineStatus.DRIVE) {
        this.updateEngineStatus(id, EngineStatus.BROKEN);
      }

      throw err;
    }
  };

  startRace = async () => {
    const startPromises = this.selectedEngines.map((id) => this.drive(id));
    const winnerId = await Promise.any(startPromises);
    const winnerEngine = this.getEngine(winnerId);
    const winnerTime = parseFloat(
      (winnerEngine.distance / winnerEngine.velocity / 1000).toFixed(3),
    );

    return { id: winnerId, newTime: winnerTime };
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

import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import { type IEngineFull, type IEngine, EngineStatus } from './types';
import { engineApi } from '../api/api';

export class EngineStore {
  engines = new Map<number, IEngineFull>();

  selectedEngines: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getEngine = (id: number) => {
    return this.engines.get(id);
  };

  getEngineStatus = (id: number) => {
    return this.getEngine(id)?.status ?? EngineStatus.STOPPED;
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
      this.updateEngine(id, engine, EngineStatus.PENDING);

      return engine;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        this.engines.delete(id);
      } else {
        this.updateEngineStatus(id, EngineStatus.STOPPED);
      }

      throw err;
    }
  };

  stop = async (id: number) => {
    try {
      const engine = await engineApi.stop(id);
      this.updateEngine(id, engine, EngineStatus.STOPPED);

      return engine;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        this.engines.delete(id);
      }

      throw err;
    }
  };

  drive = async (id: number) => {
    const engine = this.getEngine(id);
    if (!engine) {
      throw new Error('Engine not found');
    }

    try {
      this.updateEngineStatus(id, EngineStatus.STARTED);
      setTimeout(() => this.updateEngineStatus(id, EngineStatus.DRIVE));
      const { velocity, distance } = engine;
      const time = parseFloat((distance / velocity / 1000).toFixed(3));
      await engineApi.drive(id);

      return { id, time };
    } catch (err) {
      if (this.getEngineStatus(id) === EngineStatus.DRIVE) {
        this.updateEngineStatus(id, EngineStatus.BROKEN);
      }

      throw err;
    }
  };

  startCar = async (id: number) => {
    await this.start(id);
    await this.drive(id);
  };

  startRace = async () => {
    await Promise.all(this.selectedEngines.map((id) => this.start(id)));
    const drivePromises = this.selectedEngines.map((id) => this.drive(id));
    const winner = await Promise.any(drivePromises);

    return winner;
  };

  resetRace = async () => {
    const resetSelectedEngines = this.selectedEngines.map((id) => this.stop(id));
    await Promise.all(resetSelectedEngines);
  };

  private updateEngine = (id: number, engine: IEngine, status: EngineStatus) => {
    this.engines.set(id, { ...engine, status });
  };

  private updateEngineStatus = (id: number, status: EngineStatus) => {
    const currentEngine = this.engines.get(id) ?? {
      velocity: 0,
      distance: 0,
      status: EngineStatus.STOPPED,
    };

    this.engines.set(id, { ...currentEngine, status });
  };
}

export interface IEngine {
  distance: number;
  velocity: number;
}

export enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
  BROKEN = 'broken',
}

export interface IEngineFull extends IEngine {
  status: EngineStatus;
}

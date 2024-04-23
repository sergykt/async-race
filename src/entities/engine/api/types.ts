export interface IRaceResult {
  success: boolean;
}

export enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export enum EngineQueryKeys {
  ID = 'id',
  STATUS = 'status',
}

import { makeObservable } from 'mobx';
import { IEngine } from './types';

export class EngineStore {
  engines: Record<string, IEngine> = {};

  constructor() {
    makeObservable(this);
  }
}

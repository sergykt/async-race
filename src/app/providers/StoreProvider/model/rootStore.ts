import { EngineStore } from '@/entities/engine';
import { RaceTrackStore } from '@/widgets/RaceTrack';
import { WinnersTableStore } from '@/widgets/WinnersTable';

export class RootStore {
  engineStore = new EngineStore();

  raceTrackStore = new RaceTrackStore();

  winnersTableStore = new WinnersTableStore();
}

export const rootStore = new RootStore();

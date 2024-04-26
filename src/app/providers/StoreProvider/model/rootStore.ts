import { EngineStore } from '@/entities/engine';
import { RaceTrackStore } from '@/widgets/RaceTrack';
import { WinnersTableStore } from '@/widgets/WinnersTable';
import { ManagePanelStore } from '@/widgets/ManagePanel';

export class RootStore {
  engineStore = new EngineStore();

  managaPanelStore = new ManagePanelStore();

  raceTrackStore = new RaceTrackStore();

  winnersTableStore = new WinnersTableStore();
}

export const rootStore = new RootStore();

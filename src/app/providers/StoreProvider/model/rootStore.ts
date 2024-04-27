import { AnimatedCarStore } from '@/features/carAnimation';
import { EngineStore } from '@/entities/engine';
import { RaceTrackStore } from '@/widgets/RaceTrack';
import { ManagePanelStore } from '@/widgets/ManagePanel';
import { WinnersTableStore } from '@/widgets/WinnersTable';

export class RootStore {
  animatedCarStore = new AnimatedCarStore();

  engineStore = new EngineStore();

  managePanelStore = new ManagePanelStore();

  raceTrackStore = new RaceTrackStore();

  winnersTableStore = new WinnersTableStore();
}

export const rootStore = new RootStore();

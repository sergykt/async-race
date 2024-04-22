import { EngineStore } from '@/entities/engine';
import { ManagePanelStore } from '@/widgets/ManagePanel';

export class RootStore {
  engineStore = new EngineStore();

  managePanelStore = new ManagePanelStore();
}

export const rootStore = new RootStore();

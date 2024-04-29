import { observer } from 'mobx-react-lite';
import { CreateCarForm } from '@/features/createCar';
import { UpdateCarForm } from '@/features/updateCar';
import { RaceControls } from '@/features/race';
import { GenerateCarsButton } from '@/features/generateCars';
import { useStore } from '@/shared/lib/store';
import styles from './ManagePanel.module.scss';

export const ManagePanel = observer(() => {
  const {
    managePanelStore: { selectedCarId, carValues, resetSelection },
  } = useStore();

  return (
    <div className={styles.panel}>
      <RaceControls />
      <CreateCarForm />
      <UpdateCarForm
        id={selectedCarId}
        initialValues={carValues}
        disabled={!selectedCarId}
        resetSelection={resetSelection}
      />
      <GenerateCarsButton />
    </div>
  );
});

import { observer } from 'mobx-react-lite';
import { CreateCarForm } from '@/features/createCar';
import { UpdateCarForm } from '@/features/updateCar';
import { GenerateCarsButton } from '@/features/generateCars';
import { useStore } from '@/shared/lib/store';
import styles from './ManagePanel.module.scss';

export const ManagePanel = observer(() => {
  const store = useStore();
  const { selectedCarId, carValues, resetSelection } = store.raceTrackStore;

  return (
    <div className={styles.panel}>
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

import { observer } from 'mobx-react-lite';
import { CreateCarForm } from '@/features/createCar';
import { UpdateCarForm } from '@/features/updateCar';
import { RaceControls } from '@/features/race';
import { GenerateCarsButton } from '@/features/generateCars';
import { useStore } from '@/shared/lib/store';
import styles from './ManagePanel.module.scss';

export const ManagePanel = observer(() => {
  const {
    managePanelStore: {
      createFormValues,
      updateFormValues,
      onChangeCreateForm,
      onChangeUpdateForm,
      selectedCarId,
      resetCreateForm,
      resetUpdateForm,
    },
  } = useStore();

  return (
    <div className={styles.panel}>
      <RaceControls />
      <CreateCarForm
        values={createFormValues}
        onChange={onChangeCreateForm}
        reset={resetCreateForm}
      />
      <UpdateCarForm
        id={selectedCarId}
        values={updateFormValues}
        onChange={onChangeUpdateForm}
        reset={resetUpdateForm}
      />
      <GenerateCarsButton />
    </div>
  );
});

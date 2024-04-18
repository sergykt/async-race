import { CreateCarForm } from '@/features/createCar';
import { UpdateCarForm } from '@/features/updateCar';
import styles from './ManagementPanel.module.scss';

export const ManagementPanel = () => (
  <div className={styles.panel}>
    <CreateCarForm />
    <UpdateCarForm id={5} initialValues={{ name: 'test', color: '#000000' }} />
  </div>
);

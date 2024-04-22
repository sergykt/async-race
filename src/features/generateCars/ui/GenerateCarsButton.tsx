import { Button } from '@/shared/ui/Button';
import { useGenerateCars } from '../lib/queries';
import styles from './GenerateCarsButton.module.scss';

export const GenerateCarsButton = () => {
  const { mutate, isPending } = useGenerateCars();

  const handleClick = () => {
    try {
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button className={styles.generateButton} onClick={handleClick} disabled={isPending}>
      Generate cars
    </Button>
  );
};

import { type FC } from 'react';
import { Button } from '@/shared/ui/Button';
import { useDeleteCar } from '../lib/queries';
import styles from './DeleteCarButton.module.scss';

interface IDeleteCarButtonProps {
  id: number;
  callback?: () => void;
}

export const DeleteCarButton: FC<IDeleteCarButtonProps> = (props) => {
  const { id, callback = () => {} } = props;
  const { mutate, isPending } = useDeleteCar();

  const handleClick = () => {
    try {
      mutate(id);
      callback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button className={styles.deleteButton} size='small' onClick={handleClick} disabled={isPending}>
      Delete
    </Button>
  );
};

import { type FC, memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { useRemoveCar } from '../lib/queries';
import styles from './RemoveCarButton.module.scss';

interface IDeleteCarButtonProps {
  id: number;
  callback?: () => void;
}

export const RemoveCarButton: FC<IDeleteCarButtonProps> = memo((props) => {
  const { id, callback = () => {} } = props;
  const { mutate, isPending } = useRemoveCar();

  const handleClick = () => {
    try {
      mutate(id);
      callback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button className={styles.removeButton} size='small' onClick={handleClick} disabled={isPending}>
      Remove
    </Button>
  );
});

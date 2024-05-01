import { memo, type FC, type FormEvent, type ChangeEvent } from 'react';
import { type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ColorInput } from '@/shared/ui/ColorInput';
import { useUpdateCar } from '../lib/queries';
import styles from './UpdateCarForm.module.scss';

interface IUpdateCarFormProps {
  id: number | null;
  values: ICarDto;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export const UpdateCarForm: FC<IUpdateCarFormProps> = memo((props) => {
  const { id, values, onChange, reset } = props;
  const { mutateAsync, isPending } = useUpdateCar();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id || !values.name.trim()) return;
    mutateAsync({ id, body: values })
      .then(() => {
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form id='create-form' className={styles.form} onSubmit={handleSubmit}>
      <Input
        name='name'
        id='name-update-id'
        label='Car name'
        placeholder='TYPE CAR BRAND'
        disabled={!id || isPending}
        value={values.name}
        onChange={onChange}
        required
      />
      <ColorInput
        name='color'
        value={values.color}
        onChange={onChange}
        disabled={!id || isPending}
      />
      <Button type='submit' disabled={!id || isPending}>
        Update
      </Button>
    </form>
  );
});

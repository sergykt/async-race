import { memo, type FC, type FormEvent, type ChangeEvent } from 'react';
import { type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ColorInput } from '@/shared/ui/ColorInput';
import { useCreateCar } from '../lib/queries';
import styles from './CreateCarForm.module.scss';

interface ICreateCarFormProps {
  values: ICarDto;
  reset: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CreateCarForm: FC<ICreateCarFormProps> = memo((props) => {
  const { reset, values, onChange } = props;
  const { mutateAsync, isPending } = useCreateCar();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.name.trim()) {
      mutateAsync(values)
        .then(() => {
          reset();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <form id='create-form' className={styles.form} onSubmit={handleSubmit}>
      <Input
        name='name'
        id='name-create-id'
        label='Car name'
        placeholder='TYPE CAR BRAND'
        disabled={isPending}
        value={values.name}
        onChange={onChange}
        required
      />
      <ColorInput name='color' value={values.color} onChange={onChange} disabled={isPending} />
      <Button type='submit' disabled={isPending}>
        Create
      </Button>
    </form>
  );
});

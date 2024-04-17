import { useFormik } from 'formik';
import { type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ColorInput } from '@/shared/ui/ColorInput';
import { useCreateCar } from '../lib/queries';
import styles from './CreateCarForm.module.scss';

const initialValues: ICarDto = {
  name: '',
  color: '#000000',
};

export const CreateCarForm = () => {
  const { mutateAsync, isPending } = useCreateCar();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <form id='create-form' onSubmit={formik.handleSubmit} className={styles.form}>
      <Input
        name='name'
        id='name-create-id'
        label='Car name'
        type='text'
        placeholder='TYPE CAR BRAND'
        disabled={isPending}
        value={formik.values.name}
        onChange={formik.handleChange}
        required
      />
      <ColorInput
        name='color'
        id='color-create-id'
        label='Car color'
        value={formik.values.color}
        onChange={formik.handleChange}
      />
      <Button type='submit' disabled={isPending}>
        Create
      </Button>
    </form>
  );
};

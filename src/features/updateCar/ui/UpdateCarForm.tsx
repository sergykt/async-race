import { type FC } from 'react';
import { useFormik } from 'formik';
import { type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ColorInput } from '@/shared/ui/ColorInput';
import { useUpdateCar } from '../lib/queries';
import styles from './UpdateCarForm.module.scss';

interface IUpdateCarFormProps {
  id: number;
  initialValues: ICarDto;
}

export const UpdateCarForm: FC<IUpdateCarFormProps> = (props) => {
  const { id, initialValues } = props;
  const { mutateAsync, isPending } = useUpdateCar();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await mutateAsync({ id, body: values });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <form id='create-form' onSubmit={formik.handleSubmit} className={styles.form}>
      <Input
        name='name'
        id='name-update-id'
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
        id='color-update-id'
        label='Car color'
        value={formik.values.color}
        onChange={formik.handleChange}
      />
      <Button type='submit' disabled={isPending}>
        Update
      </Button>
    </form>
  );
};

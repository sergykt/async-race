import { type FC, memo } from 'react';
import { useFormik } from 'formik';
import { type ICarDto } from '@/entities/car';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ColorInput } from '@/shared/ui/ColorInput';
import { useUpdateCar } from '../lib/queries';
import styles from './UpdateCarForm.module.scss';

interface IUpdateCarFormProps {
  id: number | null;
  initialValues: ICarDto;
  disabled: boolean;
  resetSelection: () => void;
}

export const UpdateCarForm: FC<IUpdateCarFormProps> = memo((props) => {
  const { id, initialValues, disabled, resetSelection } = props;
  const { mutateAsync, isPending } = useUpdateCar();
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!id) return;
      try {
        await mutateAsync({ id, body: values });
        resetSelection();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form id='create-form' onSubmit={formik.handleSubmit} className={styles.form}>
      <Input
        name='name'
        id='name-update-id'
        label='Car name'
        placeholder='TYPE CAR BRAND'
        disabled={isPending || disabled}
        value={formik.values.name}
        onChange={formik.handleChange}
        required
      />
      <ColorInput
        name='color'
        value={formik.values.color}
        onChange={formik.handleChange}
        disabled={isPending || disabled}
      />
      <Button type='submit' disabled={isPending || disabled}>
        Update
      </Button>
    </form>
  );
});

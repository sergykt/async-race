import { type FC, type ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './ColorInput.module.scss';

interface IColorInputProps extends ComponentProps<'input'> {
  label: string;
}

export const ColorInput: FC<IColorInputProps> = (props) => {
  const { className, id, name, label, value, onChange } = props;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classNames(styles.input, className)}
        id={id}
        type='color'
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

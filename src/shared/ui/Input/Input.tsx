import { type FC, type ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IInputProps extends ComponentProps<'input'> {
  label: string;
}

export const Input: FC<IInputProps> = (props) => {
  const { className, id, name, label, type, placeholder, value, required, disabled, onChange } =
    props;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classNames(styles.input, className)}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

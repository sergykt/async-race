import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'classnames';
import styles from './ColorInput.module.scss';

type IColorInputProps = ComponentProps<'input'>;

export const ColorInput: FC<IColorInputProps> = memo((props) => {
  const { className, name, value, onChange, disabled } = props;

  return (
    <div className={styles.wrapper}>
      <input
        className={classNames(styles.input, className)}
        type='color'
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
});

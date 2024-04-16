import { type ComponentProps, type FC, memo } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type IButtonProps = ComponentProps<'button'>;

export const Button: FC<IButtonProps> = memo((props) => {
  const { type, children, disabled, id, className, ref } = props;

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      id={id}
      ref={ref}
      className={classNames(styles.button, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

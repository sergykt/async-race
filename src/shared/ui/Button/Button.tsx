import { type ComponentProps, type FC, memo } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'normal' | 'large';
}

export const Button: FC<IButtonProps> = memo((props) => {
  const { type, children, disabled, id, className, ref, size } = props;

  let buttonSize;

  switch (size) {
    case 'small':
      buttonSize = styles.small;
      break;
    case 'large':
      buttonSize = styles.large;
      break;
    default:
      break;
  }

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      id={id}
      ref={ref}
      className={classNames(styles.button, buttonSize, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

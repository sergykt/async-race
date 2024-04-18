import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = ComponentProps<'div'>;

export const Container: FC<ContainerProps> = memo((props) => {
  const { children, className, id } = props;

  return (
    <div className={classNames(styles.container, className)} id={id}>
      {children}
    </div>
  );
});

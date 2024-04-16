import { type FC, memo } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LinkButton.module.scss';

export const LinkButton: FC<NavLinkProps> = memo((props) => {
  const { className, children, id, to } = props;

  return (
    <NavLink className={classNames(styles.linkButton, className)} id={id} to={to}>
      {children}
    </NavLink>
  );
});

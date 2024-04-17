import { memo } from 'react';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';
import { Container } from '@/shared/ui/Container';
import { AppRoutes } from '@/shared/const/router';
import styles from './Header.module.scss';

export const Header = memo(() => (
  <header className={styles.header}>
    <Container className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}>
            <LinkButton to={AppRoutes.GARAGE}>Garage</LinkButton>
          </li>
          <li className={styles.linkItem}>
            <LinkButton to={AppRoutes.WINNERS}>Winners</LinkButton>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
));

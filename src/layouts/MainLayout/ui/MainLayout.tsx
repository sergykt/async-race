import { type FC, type ReactNode, memo } from 'react';
import { Header } from '@/widgets/Header';
import styles from './MainLayout.module.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = memo((props) => {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
});

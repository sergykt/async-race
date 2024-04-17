import { type FC, type ReactNode, memo } from 'react';
import { Header } from '@/widgets/Header';
import styles from './PageLayout.module.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

export const PageLayout: FC<IMainLayoutProps> = memo((props) => {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
});

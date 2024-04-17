import { PageLayout } from '@/layouts/PageLayout';
import { Container } from '@/shared/ui/Container';
import styles from './WinnersPage.module.scss';

const WinnersPage = () => (
  <PageLayout>
    <Container>
      <h1 className={styles.title}>Winners</h1>
    </Container>
  </PageLayout>
);

export default WinnersPage;

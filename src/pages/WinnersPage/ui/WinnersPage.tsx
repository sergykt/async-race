import { PageLayout } from '@/layouts/PageLayout';
import { WinnersTable } from '@/widgets/WinnersTable';
import { Container } from '@/shared/ui/Container';
import styles from './WinnersPage.module.scss';

const WinnersPage = () => (
  <PageLayout>
    <Container>
      <h1 className={styles.title}>WINNERS</h1>
      <WinnersTable />
    </Container>
  </PageLayout>
);

export default WinnersPage;

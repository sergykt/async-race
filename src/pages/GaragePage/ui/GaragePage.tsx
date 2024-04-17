import { PageLayout } from '@/layouts/PageLayout';
import { ManagementPanel } from '@/widgets/ManagementPanel';
import { RaceTrack } from '@/widgets/RaceTrack';
import { Container } from '@/shared/ui/Container';

const GaragePage = () => (
  <PageLayout>
    <Container>
      <ManagementPanel />
      <RaceTrack />
    </Container>
  </PageLayout>
);

export default GaragePage;

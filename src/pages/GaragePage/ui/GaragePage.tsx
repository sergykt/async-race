import { PageLayout } from '@/layouts/PageLayout';
import { ManagePanel } from '@/widgets/ManagePanel';
import { RaceTrack } from '@/widgets/RaceTrack';
import { Container } from '@/shared/ui/Container';

const GaragePage = () => (
  <PageLayout>
    <Container>
      <ManagePanel />
      <RaceTrack />
    </Container>
  </PageLayout>
);

export default GaragePage;

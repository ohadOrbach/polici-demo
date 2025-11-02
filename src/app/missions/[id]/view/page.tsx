import PageLayout from '@/components/layout/PageLayout';
import MissionViewDetail from '@/components/missions/MissionViewDetail';

export default async function MissionViewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <MissionViewDetail missionId={id} />
    </PageLayout>
  );
}

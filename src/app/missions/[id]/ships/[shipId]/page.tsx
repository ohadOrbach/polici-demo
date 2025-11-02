import PageLayout from '@/components/layout/PageLayout';
import ShipMissionDetail from '@/components/missions/ShipMissionDetail';

export default function ShipMissionDetailPage({ params }: { params: { id: string, shipId: string } }) {
  const { id, shipId } = params;
  return (
    <PageLayout>
      <ShipMissionDetail params={{ id, shipId }} />
    </PageLayout>
  );
}

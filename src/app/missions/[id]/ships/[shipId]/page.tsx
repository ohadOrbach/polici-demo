import PageLayout from '@/components/layout/PageLayout';
import ShipMissionDetail from '@/components/missions/ShipMissionDetail';

interface ShipMissionPageProps {
  params: Promise<{
    id: string;
    shipId: string;
  }>;
}

export default async function ShipMissionPage({ params }: ShipMissionPageProps) {
  const { id, shipId } = await params;
  
  return (
    <PageLayout 
      title="Ship Mission Details" 
      description="View detailed mission progress for individual vessel"
    >
      <ShipMissionDetail params={{ id, shipId }} />
    </PageLayout>
  );
}

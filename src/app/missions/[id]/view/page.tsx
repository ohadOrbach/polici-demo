import PageLayout from '@/components/layout/PageLayout';
import MissionViewDetail from '@/components/missions/MissionViewDetail';

interface MissionViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MissionViewPage({ params }: MissionViewPageProps) {
  const { id } = await params;
  
  return (
    <PageLayout 
      title="Mission Details" 
      description="View mission progress across assigned vessels"
    >
      <MissionViewDetail missionId={id} />
    </PageLayout>
  );
}

import PageLayout from '@/components/layout/PageLayout';
import FleetNavigation from '@/components/fleet/FleetNavigation';
import FleetOverview from '@/components/fleet/FleetOverview';

export default function FleetPage() {
  return (
    <PageLayout 
      title="Fleet Management" 
      description="Monitor and manage your maritime fleet operations"
    >
      <FleetNavigation />
      <FleetOverview />
    </PageLayout>
  );
}

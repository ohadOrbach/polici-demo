import PageLayout from '@/components/layout/PageLayout';
import FleetNavigation from '@/components/fleet/FleetNavigation';
import FleetOverview from '@/components/fleet/FleetOverview';

export default function FleetPage() {
  return (
    <PageLayout>
      <FleetNavigation />
      <FleetOverview />
    </PageLayout>
  );
}

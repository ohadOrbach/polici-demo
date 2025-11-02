import PageLayout from '@/components/layout/PageLayout';
import FleetNavigation from '@/components/fleet/FleetNavigation';
import ShipAssignment from '@/components/fleet/ShipAssignment';

export default function AssignmentsPage() {
  return (
    <PageLayout>
      <FleetNavigation />
      <ShipAssignment />
    </PageLayout>
  );
}

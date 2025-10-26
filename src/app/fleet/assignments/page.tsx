import PageLayout from '@/components/layout/PageLayout';
import FleetNavigation from '@/components/fleet/FleetNavigation';
import ShipAssignment from '@/components/fleet/ShipAssignment';

export default function FleetAssignmentsPage() {
  return (
    <PageLayout 
      title="Mission Assignments" 
      description="Assign and manage missions across your fleet"
    >
      <FleetNavigation />
      <ShipAssignment />
    </PageLayout>
  );
}

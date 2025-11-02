import PageLayout from '@/components/layout/PageLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import MissionFilters from '@/components/dashboard/MissionFilters';
import MissionGrid from '@/components/dashboard/MissionGrid';

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="space-lg">
        {/* Key Statistics */}
        <section>
          <DashboardStats />
        </section>
        
        {/* Mission Filters */}
        <section>
          <MissionFilters />
        </section>
        
        {/* Mission Grid */}
        <section>
          <MissionGrid />
        </section>
      </div>
    </PageLayout>
  );
}

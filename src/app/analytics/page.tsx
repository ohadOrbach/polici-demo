import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <PageLayout>
      <AnalyticsNavigation />
      <AnalyticsDashboard />
    </PageLayout>
  );
}

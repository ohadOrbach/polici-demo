import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import PerformanceMetrics from '@/components/analytics/PerformanceMetrics';

export default function PerformancePage() {
  return (
    <PageLayout>
      <AnalyticsNavigation />
      <PerformanceMetrics />
    </PageLayout>
  );
}

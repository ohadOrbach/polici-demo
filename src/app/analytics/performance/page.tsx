import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import PerformanceMetrics from '@/components/analytics/PerformanceMetrics';

export default function PerformancePage() {
  return (
    <PageLayout 
      title="Performance Metrics" 
      description="Comprehensive performance analytics and KPI tracking for maritime operations"
    >
      <AnalyticsNavigation />
      <PerformanceMetrics />
    </PageLayout>
  );
}

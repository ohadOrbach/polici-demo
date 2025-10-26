import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <PageLayout 
      title="Fleet Analytics" 
      description="Comprehensive maritime compliance and performance analytics"
    >
      <AnalyticsNavigation />
      <AnalyticsDashboard />
    </PageLayout>
  );
}

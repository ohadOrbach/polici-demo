import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import TrendAnalysis from '@/components/analytics/TrendAnalysis';

export default function TrendsPage() {
  return (
    <PageLayout>
      <AnalyticsNavigation />
      <TrendAnalysis />
    </PageLayout>
  );
}

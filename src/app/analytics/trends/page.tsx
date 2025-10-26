import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import TrendAnalysis from '@/components/analytics/TrendAnalysis';

export default function TrendsPage() {
  return (
    <PageLayout 
      title="Trend Analysis" 
      description="Analyze compliance trends, performance patterns, and fleet evolution over time"
    >
      <AnalyticsNavigation />
      <TrendAnalysis />
    </PageLayout>
  );
}

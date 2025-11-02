import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import ReportGenerator from '@/components/analytics/ReportGenerator';

export default function ReportsPage() {
  return (
    <PageLayout>
      <AnalyticsNavigation />
      <ReportGenerator />
    </PageLayout>
  );
}

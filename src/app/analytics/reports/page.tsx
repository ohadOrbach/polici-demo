import PageLayout from '@/components/layout/PageLayout';
import AnalyticsNavigation from '@/components/analytics/AnalyticsNavigation';
import ReportGenerator from '@/components/analytics/ReportGenerator';

export default function ReportsPage() {
  return (
    <PageLayout 
      title="Report Generator" 
      description="Generate comprehensive maritime compliance and operational reports"
    >
      <AnalyticsNavigation />
      <ReportGenerator />
    </PageLayout>
  );
}

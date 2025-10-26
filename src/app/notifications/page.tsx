import PageLayout from '@/components/layout/PageLayout';
import WebNotifications from '@/components/notifications/WebNotifications';

export default function NotificationsPage() {
  return (
    <PageLayout 
      title="Notifications" 
      description="Manage your maritime alerts and notifications"
    >
      <WebNotifications />
    </PageLayout>
  );
}

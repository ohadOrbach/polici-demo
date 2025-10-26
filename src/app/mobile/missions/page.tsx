import MobileLayout from '@/components/layout/MobileLayout';
import InteractiveTaskList from '@/components/mobile/InteractiveTaskList';

export default function MobileMissionsPage() {
  return (
    <MobileLayout title="Tasks">
      <InteractiveTaskList />
    </MobileLayout>
  );
}

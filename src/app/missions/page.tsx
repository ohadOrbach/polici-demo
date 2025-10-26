import MissionLayout from '@/components/layout/MissionLayout';
import EnhancedMissionCreationForm from '@/components/missions/EnhancedMissionCreationForm';

export default function MissionsPage() {
  return (
    <MissionLayout>
      <EnhancedMissionCreationForm />
    </MissionLayout>
  );
}

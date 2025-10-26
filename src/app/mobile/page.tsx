import { redirect } from 'next/navigation';

export default function MobilePage() {
  // Redirect to tasks page since we only have tasks now
  redirect('/mobile/missions');
}

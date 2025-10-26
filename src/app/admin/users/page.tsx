import PageLayout from '@/components/layout/PageLayout';
import UserManagement from '@/components/auth/UserManagement';

export default function UsersPage() {
  return (
    <PageLayout 
      title="User Management" 
      description="Manage user accounts, roles, and permissions"
    >
      <UserManagement />
    </PageLayout>
  );
}

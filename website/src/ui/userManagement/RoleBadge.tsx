// components/UserManagement/RoleBadge.tsx
import { UserRole } from '@/types/user';

interface RoleBadgeProps {
  role: UserRole;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const styles = {
    Admin: 'bg-[#2a4f4f] text-white',
    Member: 'bg-[#2a4f4f] text-white',
    Viewer: 'bg-[#2a4f4f] text-white',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${styles[role]}`}>
      {role}
    </span>
  );
}
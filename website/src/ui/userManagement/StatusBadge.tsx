// components/UserManagement/StatusBadge.tsx
import { UserStatus } from '@/types/auth/user';

interface StatusBadgeProps {
  status: UserStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Active: 'bg-green-500/10 text-green-400 border-green-500/20',
    Inactive: 'bg-red-500/10 text-red-400 border-red-500/20',
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  };

  const icons = {
    Active: '●',
    Inactive: '●',
    Pending: '●',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
    >
      <span className="text-xs">{icons[status]}</span>
      {status}
    </span>
  );
}
// components/UserManagement/UserRow.tsx
import { User } from '@/types/auth/user';
import { MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RoleBadge from './RoleBadge';

interface UserRowProps {
  user: User;
  isSelected: boolean;
  onToggleSelect: (userId: string) => void;
}

export default function UserRow({ user, isSelected, onToggleSelect }: UserRowProps) {
  return (
    <tr className="border-b border-[#2a4f4f] hover:bg-[#0f2525] transition-colors">
      <td className="p-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(user.id)}
          className="w-5 h-5 rounded border-[#2a4f4f] bg-[#0f2525] checked:bg-[#2dd4bf] cursor-pointer"
        />
      </td>
      <td className="p-4">
        <div>
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-sm text-gray-400">{user.email}</div>
        </div>
      </td>
      <td className="p-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="p-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="p-4 text-gray-300">{user.lastActive}</td>
      <td className="p-4">
        <button className="p-2 hover:bg-[#2a4f4f] rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}
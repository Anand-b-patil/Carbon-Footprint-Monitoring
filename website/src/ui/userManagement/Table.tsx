// components/UserManagement/UserTable.tsx
import { useState } from 'react';
import { User } from '@/types/user';
import UserRow from './UserRow';

interface UserTableProps {
  users: User[];
  totalUsers: number;
}

export default function UserTable({ users, totalUsers }: UserTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleAllUsers = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.id)));
    }
  };

  return (
    <div className="bg-[#1a2f2f] border border-[#2a4f4f] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a4f4f]">
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === users.length && users.length > 0}
                  onChange={toggleAllUsers}
                  className="w-5 h-5 rounded border-[#2a4f4f] bg-[#0f2525] checked:bg-[#2dd4bf] cursor-pointer"
                />
              </th>
              <th className="text-left p-4 text-gray-400 font-medium">User</th>
              <th className="text-left p-4 text-gray-400 font-medium">Role</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Last Active</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                isSelected={selectedUsers.has(user.id)}
                onToggleSelect={toggleUserSelection}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-[#2a4f4f]">
        <div className="text-gray-400">
          Showing 1-4 of {totalUsers} users
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#0f2525] hover:bg-[#2a4f4f] border border-[#2a4f4f] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-[#0f2525] hover:bg-[#2a4f4f] border border-[#2a4f4f] rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
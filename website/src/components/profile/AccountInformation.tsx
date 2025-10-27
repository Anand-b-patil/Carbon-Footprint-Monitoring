// components/Profile/AccountInformation.tsx
import { LogOut } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import InfoRow from './InfoRow';

interface AccountInformationProps {
  data: ProfileData;
}

export default function AccountInformation({ data }: AccountInformationProps) {
  return (
    <div className="bg-[#1a3333] rounded-2xl border border-[#2a4444] p-8 mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Account Information</h2>
        <p className="text-gray-400">Your personal details and organization.</p>
      </div>

      <div className="space-y-1 mb-8">
        <InfoRow label="Email" value={data.email} />
        <InfoRow label="Organization" value={data.organization} />
        <InfoRow label="Current Role" value={data.currentRole} />
      </div>

      <div className="flex justify-end">
        <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
// app/profile/page.tsx
'use client';

import { useState } from 'react';
import AccountInformation from '@/components/profile/AccountInformation';
import LoadingStateExample from '@/components/profile/LandingState';
import { ProfileData } from '@/types/auth/profile';

export default function ProfilePage() {
  const [isLoading] = useState(false);
  const [profileData] = useState<ProfileData>({
    email: 'user.name@example.com',
    organization: 'Global Innovations Inc.',
    currentRole: 'Administrator',
  });

  return (
    <div className="min-h-screen bg-[#0d1f1f] text-white">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-12">My Profile</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <AccountInformation data={profileData} />
            <LoadingStateExample />
          </>
        )}
      </div>
    </div>
  );
}
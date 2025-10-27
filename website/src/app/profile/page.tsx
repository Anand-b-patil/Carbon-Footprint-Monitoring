// app/profile/page.tsx
'use client';

import { useState } from 'react';
import AccountInformation from '@/components/Profile/AccountInformation';
import LoadingStateExample from '@/components/Profile/LoadingStateExample';
import { ProfileData } from '@/types/profile';

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

// app/profile/layout.tsx
import ProfileSidebar from '@/components/Layout/ProfileSidebar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0d1f1f]">
      <ProfileSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
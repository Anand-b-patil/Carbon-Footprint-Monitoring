import SideBar from '@/components/profile/SideBar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0d1f1f]">
      <SideBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

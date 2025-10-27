import SideBar from '@/components/admin/SideBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a1a1a]">
      <SideBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

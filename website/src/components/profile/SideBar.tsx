// components/Layout/ProfileSidebar.tsx
import { LayoutDashboard, Activity, BarChart3, User } from 'lucide-react';

export default function ProfileSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Activity, label: 'Activities', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
    { icon: User, label: 'My Profile', active: true },
  ];

  return (
    <aside className="w-64 bg-[#0d1f1f] border-r border-[#2a4444] h-screen flex flex-col">
      {/* Company Branding */}
      <div className="p-6 border-b border-[#2a4444]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#2a4444] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#3a5555] flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-5 h-5 text-[#5a7575]"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white">Emissions Co.</div>
            <div className="text-sm text-gray-400">Management Tool</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              item.active
                ? 'bg-[#1a3333] text-white'
                : 'text-gray-400 hover:bg-[#1a2a2a] hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
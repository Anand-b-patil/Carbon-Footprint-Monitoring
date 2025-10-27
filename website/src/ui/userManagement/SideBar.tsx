// components/Layout/Sidebar.tsx
import { LayoutDashboard, Activity, BarChart3, Users, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Activity, label: 'Activities', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
    { icon: Users, label: 'User Management', active: true },
  ];

  return (
    <aside className="w-64 bg-[#0a1a1a] border-r border-[#2a4f4f] h-screen flex flex-col">
      {/* Admin Profile */}
      <div className="p-6 border-b border-[#2a4f4f]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-semibold">
            AN
          </div>
          <div>
            <div className="font-semibold text-white">Admin Name</div>
            <div className="text-sm text-gray-400">admin@company.com</div>
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
                ? 'bg-[#1a3d3d] text-[#2dd4bf]'
                : 'text-gray-400 hover:bg-[#1a2f2f] hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#2a4f4f]">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#1a2f2f] hover:text-white transition-colors mb-2">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#1a2f2f] hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}
'use client';

import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Activities');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Activities', icon: Activity, href: '/activities' },
    { name: 'Reports', icon: FileText, href: '/reports' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  const bottomItems = [
    { name: 'Support', icon: HelpCircle, href: '/support' },
    { name: 'Logout', icon: LogOut, href: '/logout' },
  ];

  return (
    <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">A</span>
          </div>
          <div>
            <div className="text-white font-semibold">Admin User</div>
            <div className="text-gray-400 text-sm">admin@emissions.co</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-800">
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-300 transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
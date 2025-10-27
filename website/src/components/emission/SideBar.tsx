'use client';

import { 
  LayoutDashboard, 
  Activity, 
  Layers,
  BarChart3, 
  Settings, 
  HelpCircle,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FactorsSidebar() {
  const [activeItem, setActiveItem] = useState('Emission Factors');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Activities', icon: Activity, href: '/activities' },
    { name: 'Emission Factors', icon: Layers, href: '/emission-factors' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help', icon: HelpCircle, href: '/help' },
  ];

  return (
    <aside className="w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
              alt="Eleanor Vance"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-semibold">Eleanor Vance</div>
            <div className="text-gray-400 text-sm">Admin</div>
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
                      ? 'bg-emerald-600/20 text-white'
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

        {/* New Activity Button */}
        <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          New Activity
        </button>
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
"use client";

import {
  LayoutDashboard,
  Activity,
  BarChart3,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function AdminSidebar() {
  const [activeItem, setActiveItem] = useState('Admin');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Activities', icon: Activity, href: '/activities' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
    { name: 'Admin', icon: ShieldCheck, href: '/admin' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-500 to-gray-600 flex items-center justify-center overflow-hidden">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin User"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="text-white font-semibold">Admin User</div>
            <div className="text-gray-400 text-sm">admin.user@example.com</div>
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
      </nav>
    </aside>
  );
}
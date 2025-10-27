'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Admin');

  const tabs = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Reports', href: '/reports' },
    { name: 'Settings', href: '/settings' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center relative">
              <div className="absolute inset-1 border-2 border-white/90 rounded" 
                   style={{ 
                     clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                   }} 
              />
            </div>
            <span className="text-xl font-semibold text-white">Emissions Manager</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'text-white underline decoration-2 underline-offset-4'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 hover:opacity-90 transition-opacity">
              <span className="sr-only">User menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
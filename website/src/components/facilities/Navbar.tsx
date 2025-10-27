'use client';

import { HelpCircle, Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FacilitiesNavbar() {
  const [activeTab, setActiveTab] = useState('Facilities');

  const tabs = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Activities', href: '/activities' },
    { name: 'Reports', href: '/reports' },
  ];

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center transform rotate-45">
              <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45" />
            </div>
            <span className="text-xl font-semibold text-white">Emissions Manager</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                onClick={() => setActiveTab(tab.name)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'text-emerald-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Help Button */}
            <button className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-300">
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            {/* User Avatar */}
            <button className="w-9 h-9 rounded-full bg-linear-to-br from-gray-400 to-gray-500 hover:opacity-90 transition-opacity">
              <span className="sr-only">User menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
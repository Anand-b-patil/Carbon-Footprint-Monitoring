'use client';

import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const tabs = ['Dashboard', 'Activities', 'Reports', 'Admin'];

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-white/80" />
            </div>
            <span className="text-xl font-bold text-white">EmissionsCo.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
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
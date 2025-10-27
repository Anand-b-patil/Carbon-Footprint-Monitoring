'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function StatsCards() {
  const stats: StatCard[] = [
    {
      title: 'Total CO2e',
      value: '1,234 t',
      change: '2.1% vs last period',
      isPositive: false,
    },
    {
      title: 'Scope 1 / 2 / 3',
      value: '300 / 650 / 284 t',
      change: '1.5% vs last period',
      isPositive: true,
    },
    {
      title: 'Active Facilities',
      value: '12',
      change: '0.8% vs last period',
      isPositive: true,
    },
    {
      title: 'Last Activity',
      value: 'Oct 26, 2023',
      change: 'at 4:32 PM',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
        >
          <div className="text-sm text-gray-400 mb-2">{stat.title}</div>
          <div className="text-3xl font-bold text-white mb-3">
            {stat.value}
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              stat.isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {index < 3 && (
              stat.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )
            )}
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
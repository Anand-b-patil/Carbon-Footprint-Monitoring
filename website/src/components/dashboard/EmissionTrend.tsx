'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmissionsTrend() {
  const data = [
    { name: 'Week 1', value: 980 },
    { name: 'Week 2', value: 1450 },
    { name: 'Week 3', value: 1180 },
    { name: 'Week 4', value: 1320 },
  ];

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Total Emissions Trend
        </h3>
        <p className="text-sm text-gray-400">Last 30 Days</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            fill="#10B981" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
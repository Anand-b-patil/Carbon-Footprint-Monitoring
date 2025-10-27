'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function EmissionsByScope() {
  const data = [
    { name: 'Scope 1', value: 24.3, color: '#3B82F6' },
    { name: 'Scope 2', value: 52.7, color: '#10B981' },
    { name: 'Scope 3', value: 23.0, color: '#F59E0B' },
  ];

  const total = 1234;

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Emissions by Scope
        </h3>
        <p className="text-sm text-gray-400">Last 30 Days</p>
      </div>

      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">{total.toLocaleString()}</div>
            <div className="text-sm text-gray-400">tCO₂e</div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
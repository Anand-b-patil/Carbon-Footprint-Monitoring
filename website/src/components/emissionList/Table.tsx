'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Emission {
  id: number;
  date: string;
  activity: string;
  scope: string;
  facility: string;
  emissions: string;
  unit: string;
}

interface EmissionsTableProps {
  filters: any;
}

export default function EmissionsTable({ filters }: EmissionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const emissions: Emission[] = [
    {
      id: 1,
      date: '2024-01-15',
      activity: 'Office Electricity',
      scope: 'Scope 2',
      facility: 'Main Production Plant',
      emissions: '1,234.56',
      unit: 'kg CO2e',
    },
    {
      id: 2,
      date: '2024-01-14',
      activity: 'Business Travel - Air',
      scope: 'Scope 3',
      facility: 'Regional Office',
      emissions: '2,450.00',
      unit: 'kg CO2e',
    },
    {
      id: 3,
      date: '2024-01-13',
      activity: 'Natural Gas Heating',
      scope: 'Scope 1',
      facility: 'Distribution Center',
      emissions: '890.25',
      unit: 'kg CO2e',
    },
    {
      id: 4,
      date: '2024-01-12',
      activity: 'Company Vehicles',
      scope: 'Scope 1',
      facility: 'Main Production Plant',
      emissions: '1,567.80',
      unit: 'kg CO2e',
    },
    {
      id: 5,
      date: '2024-01-11',
      activity: 'Purchased Steam',
      scope: 'Scope 2',
      facility: 'Distribution Center',
      emissions: '678.90',
      unit: 'kg CO2e',
    },
  ];

  const getScopeColor = (scope: string) => {
    if (scope === 'Scope 1') return 'bg-blue-500/20 text-blue-400';
    if (scope === 'Scope 2') return 'bg-emerald-500/20 text-emerald-400';
    return 'bg-orange-500/20 text-orange-400';
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Activity
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Scope
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Facility
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Emissions
              </th>
            </tr>
          </thead>
          <tbody>
            {emissions.map((emission, index) => (
              <tr
                key={emission.id}
                className={`border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors ${
                  index === emissions.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="py-4 px-6 text-gray-300">{emission.date}</td>
                <td className="py-4 px-6 text-white font-medium">{emission.activity}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getScopeColor(emission.scope)}`}>
                    {emission.scope}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-300">{emission.facility}</td>
                <td className="py-4 px-6 text-right">
                  <div className="text-white font-semibold">{emission.emissions}</div>
                  <div className="text-sm text-gray-500">{emission.unit}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing 1 to 5 of 50 results
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[1, 2, 3, '...', 10].map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-emerald-500 text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
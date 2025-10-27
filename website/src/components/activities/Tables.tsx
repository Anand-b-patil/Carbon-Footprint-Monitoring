'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Calendar, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

interface Activity {
  id: number;
  activity: string;
  category: string;
  unit: string;
  value: string;
}

export default function ActivitiesTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'computed' | 'raw'>('computed');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const activities: Activity[] = [
    {
      id: 1,
      activity: 'Office Electricity Usage',
      category: 'Scope 2',
      unit: 'kWh',
      value: '5,200',
    },
    {
      id: 2,
      activity: 'Sales Team Travel',
      category: 'Scope 3',
      unit: 'miles',
      value: '1,500',
    },
    {
      id: 3,
      activity: 'Server Farm Energy',
      category: 'Scope 2',
      unit: 'kWh',
      value: '12,000',
    },
    {
      id: 4,
      activity: 'Employee Commute',
      category: 'Scope 3',
      unit: 'miles',
      value: '25,000',
    },
    {
      id: 5,
      activity: 'Natural Gas Heating',
      category: 'Scope 1',
      unit: 'therms',
      value: '300',
    },
  ];

  const totalPages = 10;

  const getCategoryColor = (category: string) => {
    if (category === 'Scope 1') return 'bg-blue-500/20 text-blue-400';
    if (category === 'Scope 2') return 'bg-emerald-500/20 text-emerald-400';
    return 'bg-orange-500/20 text-orange-400';
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Filter and Calendar Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-700 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button className="p-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-700 transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 ml-4">
            <span className="text-sm text-gray-400">Raw Events</span>
            <button
              onClick={() => setViewMode(viewMode === 'computed' ? 'raw' : 'computed')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                viewMode === 'computed' ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  viewMode === 'computed' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-gray-300">Computed Emissions</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                Activity
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                Category
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                Unit
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                Value
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={activity.id}
                className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                  index === activities.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="py-4 px-6 text-white">{activity.activity}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${getCategoryColor(
                      activity.category
                    )}`}
                  >
                    {activity.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-300">{activity.unit}</td>
                <td className="py-4 px-6 text-gray-300">{activity.value}</td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-300 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {renderPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`min-w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-emerald-500 text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Search } from 'lucide-react';

interface EmissionsFiltersProps {
  filters: {
    scope: string;
    facility: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function EmissionsFilters({ filters, onFiltersChange }: EmissionsFiltersProps) {
  const scopes = ['Scope 1', 'Scope 2', 'Scope 3'];
  const facilities = ['All Facilities', 'Main Production Plant', 'Distribution Center', 'Regional Office'];
  const dateRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'Custom'];

  const handleChange = (field: string, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleApply = () => {
    console.log('Applying filters:', filters);
  };

  const handleReset = () => {
    onFiltersChange({
      scope: '',
      facility: '',
      dateRange: '',
    });
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Scope Filter */}
        <div>
          <div className="relative">
            <select
              value={filters.scope}
              onChange={(e) => handleChange('scope', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">All Scopes</option>
              {scopes.map((scope) => (
                <option key={scope} value={scope} className="bg-gray-800">
                  {scope}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Facility Filter */}
        <div>
          <div className="relative">
            <select
              value={filters.facility}
              onChange={(e) => handleChange('facility', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Select Facility</option>
              {facilities.map((facility) => (
                <option key={facility} value={facility} className="bg-gray-800">
                  {facility}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => handleChange('dateRange', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Date Range</option>
              {dateRanges.map((range) => (
                <option key={range} value={range} className="bg-gray-800">
                  {range}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleReset}
          className="px-5 py-2 text-gray-300 hover:text-white transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
'use client';

import { Calendar } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    category: string;
    geography: string;
    validOn: string;
  };
  onFiltersChange: (filters: any) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onClear,
}: FilterPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFiltersChange({ ...filters, [name]: value });
  };

  const categories = [
    'Purchased Electricity',
    'Business Travel',
    'Stationary Combustion',
    'Mobile Combustion',
    'Waste',
  ];

  const geographies = ['USA', 'Global', 'UK', 'EU', 'Canada', 'Asia Pacific'];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">Filter & Preview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm text-gray-400 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Geography */}
        <div>
          <label htmlFor="geography" className="block text-sm text-gray-400 mb-2">
            Geography
          </label>
          <div className="relative">
            <select
              id="geography"
              name="geography"
              value={filters.geography}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Select geography</option>
              {geographies.map((geo) => (
                <option key={geo} value={geo} className="bg-gray-900">
                  {geo}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Valid On */}
        <div>
          <label htmlFor="validOn" className="block text-sm text-gray-400 mb-2">
            Valid On
          </label>
          <div className="relative">
            <input
              type="date"
              id="validOn"
              name="validOn"
              value={filters.validOn}
              onChange={handleChange}
              placeholder="Select a date"
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent [color-scheme:dark]"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex items-end">
          <button
            onClick={onApply}
            className="w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Clear Button */}
        <div className="flex items-end">
          <button
            onClick={onClear}
            className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
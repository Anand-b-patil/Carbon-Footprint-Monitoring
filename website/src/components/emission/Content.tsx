'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import FilterPanel from '@/components/factors/FilterPanel';
import FactorsTable from '@/components/factors/FactorsTable';

export default function FactorsContent() {
  const [filters, setFilters] = useState({
    category: '',
    geography: '',
    validOn: '',
  });

  const handleAddFactor = () => {
    console.log('Add Factor clicked');
    // Navigate to add factor form or open modal
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
    // Apply filters to table data
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      geography: '',
      validOn: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Emission Factors Management
          </h1>
          <p className="text-gray-400">
            Browse, filter, and manage emission factors for your organization.
          </p>
        </div>

        <button
          onClick={handleAddFactor}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Factor
        </button>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Factors Table */}
      <FactorsTable filters={filters} />
    </div>
  );
}
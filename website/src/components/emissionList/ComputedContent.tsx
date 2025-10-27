'use client';

import { useState } from 'react';
import { Calculator, Download } from 'lucide-react';
import EmissionsFilters from '@/components/emissions/EmissionsFilters';
import EmissionsTable from '@/components/emissions/EmissionsTable';
import RecomputeModal from '@/components/emissions/RecomputeModal';

export default function ComputedEmissionsContent() {
  const [showRecomputeModal, setShowRecomputeModal] = useState(false);
  const [filters, setFilters] = useState({
    scope: '',
    facility: '',
    dateRange: '',
  });

  const handleRecompute = () => {
    setShowRecomputeModal(true);
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Computed Emissions
          </h1>
          <p className="text-gray-400">
            View and analyze calculated emissions data across your organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRecompute}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Recompute
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <EmissionsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Emissions Table */}
      <EmissionsTable filters={filters} />

      {/* Recompute Modal */}
      {showRecomputeModal && (
        <RecomputeModal onClose={() => setShowRecomputeModal(false)} />
      )}
    </div>
  );
}
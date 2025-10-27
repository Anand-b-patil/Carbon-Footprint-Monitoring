'use client';

import { Upload, Plus } from 'lucide-react';

export default function ActivitiesHeader() {
  const handleUploadCSV = () => {
    console.log('Upload CSV clicked');
  };

  const handleAddActivity = () => {
    console.log('Add Activity clicked');
  };

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Recent Emissions Activities
          </h1>
          <p className="text-gray-400">
            View, filter, and manage all recorded emissions data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Upload CSV Button */}
          <button
            onClick={handleUploadCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-500/10 transition-all font-medium"
          >
            <Upload className="w-4 h-4" />
            Upload CSV
          </button>

          {/* Add Activity Button */}
          <button
            onClick={handleAddActivity}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-900 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import DateRangeCalendar from '@/components/reports/DateRangeCalendar';
import ReportInstructions from '@/components/reports/ReportInstructions';
import { Download } from 'lucide-react';

export default function EmissionsActivityReport() {
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleDownload = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      console.log('Downloading report for:', selectedRange);
      // Add download logic here
    } else {
      alert('Please select a date range first');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Emissions Activity Report
        </h1>
        <p className="text-gray-400">
          Generate and download a CSV report for a specific date range.
        </p>
      </div>

      {/* Date Range Selection */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Select Date Range
        </h2>

        <DateRangeCalendar 
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
        />

        {/* Download Button */}
        <div className="mt-8">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Instructions */}
      <ReportInstructions />
    </div>
  );
}
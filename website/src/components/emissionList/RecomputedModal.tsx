'use client';

import { AlertTriangle } from 'lucide-react';

interface RecomputeModalProps {
  onClose: () => void;
}

export default function RecomputeModal({ onClose }: RecomputeModalProps) {
  const handleConfirm = () => {
    console.log('Recomputation confirmed');
    // Add recomputation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-md w-full shadow-2xl">
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Confirm Recomputation
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                This is a resource-intensive process that will recompute all data within the selected date range. This action cannot be undone and should not be performed frequently.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Confirm Recomputation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import FacilitiesTable from '@/components/facilities/FacilitiesTable';
import SearchBar from '@/components/facilities/SearchBar';

export default function FacilitiesContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewFacility = () => {
    console.log('New Facility clicked');
    // Navigate to new facility form or open modal
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold text-white">Facilities</h1>
        
        <button
          onClick={handleNewFacility}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-900 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Facility
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Facilities Table */}
      <FacilitiesTable searchQuery={searchQuery} />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface EmissionFactor {
  id: number;
  factorName: string;
  category: string;
  geography: string;
  value: string;
  unit: string;
  source: string;
  validFrom: string;
  validTo: string;
}

interface FactorsTableProps {
  filters: {
    category: string;
    geography: string;
    validOn: string;
  };
}

export default function FactorsTable({ filters }: FactorsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const emissionFactors: EmissionFactor[] = [
    {
      id: 1,
      factorName: 'Grid Electricity',
      category: 'Purchased Electricity',
      geography: 'USA',
      value: '0.45',
      unit: 'kgCO2e/kWh',
      source: 'EPA eGRID',
      validFrom: '2023-01-01',
      validTo: '2023-12-31',
    },
    {
      id: 2,
      factorName: 'Business Travel - Air',
      category: 'Business Travel',
      geography: 'Global',
      value: '0.12',
      unit: 'kgCO2e/km',
      source: 'DEFRA',
      validFrom: '2023-01-01',
      validTo: '2023-12-31',
    },
    {
      id: 3,
      factorName: 'Natural Gas Combustion',
      category: 'Stationary Combustion',
      geography: 'UK',
      value: '2.05',
      unit: 'kgCO2e/m³',
      source: 'BEIS',
      validFrom: '2022-01-01',
      validTo: '2022-12-31',
    },
  ];

  const totalPages = 3;
  const totalResults = 15;

  const handleEdit = (id: number) => {
    console.log('Edit factor:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete factor:', id);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Factor Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Geography
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Value / Unit
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Valid From
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Valid To
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {emissionFactors.map((factor, index) => (
                <tr
                  key={factor.id}
                  className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                    index === emissionFactors.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="py-4 px-6 text-white font-medium">
                    {factor.factorName}
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    {factor.category}
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    {factor.geography}
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    <div>{factor.value}</div>
                    <div className="text-gray-400 text-xs">{factor.unit}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    {factor.source}
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    {factor.validFrom}
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">
                    {factor.validTo}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(factor.id)}
                        className="p-2 text-gray-400 hover:text-emerald-400 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(factor.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Results Count */}
        <div className="px-6 py-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing 1 to 3 of {totalResults} results
          </p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-gray-700 text-white'
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
  );
}
// components/UserManagement/SearchBar.tsx
import { Search, SlidersHorizontal, Download } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="bg-[#1a2f2f] border border-[#2a4f4f] rounded-xl p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f2525] border border-[#2a4f4f] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2dd4bf] transition-colors"
          />
        </div>
        <button className="bg-[#1a2f2f] hover:bg-[#2a4f4f] border border-[#2a4f4f] p-3 rounded-lg transition-colors">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
        <button className="bg-[#1a2f2f] hover:bg-[#2a4f4f] border border-[#2a4f4f] p-3 rounded-lg transition-colors">
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import EmissionsTrend from '@/components/dashboard/EmissionsTrend';
import EmissionsByScope from '@/components/dashboard/EmissionsByScope';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title and Filter */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Emissions Dashboard</h1>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Last 30 Days
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <EmissionsTrend />
          <EmissionsByScope />
        </div>
      </main>
    </div>
  );
}
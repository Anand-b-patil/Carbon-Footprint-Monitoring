import FactorsSidebar from '@/components/factors/FactorsSidebar';
import FactorsContent from '@/components/factors/FactorsContent';

export default function EmissionFactorsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <FactorsSidebar />
      
      <main className="flex-1 p-8">
        <FactorsContent />
      </main>
    </div>
  );
}
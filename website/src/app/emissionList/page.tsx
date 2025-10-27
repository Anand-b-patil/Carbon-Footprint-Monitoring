import EmissionsSidebar from '@/components/emissions/EmissionsSidebar';
import ComputedEmissionsContent from '@/components/emissions/ComputedEmissionsContent';

export default function ComputedEmissionsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <EmissionsSidebar />
      
      <main className="flex-1 p-8">
        <ComputedEmissionsContent />
      </main>
    </div>
  );
}
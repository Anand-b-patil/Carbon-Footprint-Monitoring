import ActivitiesHeader from '@/components/activities/ActivitiesHeader';
import ActivitiesTable from '@/components/activities/ActivitiesTable';
import Navbar from '@/components/layout/Navbar';

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ActivitiesHeader />
        <ActivitiesTable />
      </main>
    </div>
  );
}
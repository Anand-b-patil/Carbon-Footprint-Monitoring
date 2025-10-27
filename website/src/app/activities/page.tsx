import ActivitiesHeader from '@/components/activities/Header';
import ActivitiesTable from '@/components/activities/Tables';

export default function ActivitiesPage() {
  return (
  <div className="min-h-screen bg-linear-to-br from-gray-900 via-emerald-950 to-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ActivitiesHeader />
        <ActivitiesTable />
      </main>
    </div>
  );
}

import FacilitiesNavbar from '@/components/facilities/FacilitiesNavbar';
import FacilitiesContent from '@/components/facilities/FacilitiesContent';

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
      <FacilitiesNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <FacilitiesContent />
      </main>
    </div>
  );
}
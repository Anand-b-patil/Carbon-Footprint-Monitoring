// components/Profile/InfoRow.tsx
interface InfoRowProps {
  label: string;
  value: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center py-4 border-b border-[#2a4444] last:border-b-0">
      <div className="w-48 text-gray-400">{label}</div>
      <div className="flex-1 text-white">{value}</div>
    </div>
  );
}
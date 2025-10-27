// components/Profile/SkeletonRow.tsx
interface SkeletonRowProps {
  width?: string;
  height?: string;
  rounded?: string;
}

export default function SkeletonRow({ 
  width = '100%', 
  height = '20px',
  rounded = 'md'
}: SkeletonRowProps) {
  return (
    <div
      className={`bg-gradient-to-r from-[#2a4444] via-[#3a5555] to-[#2a4444] bg-[length:200%_100%] animate-shimmer rounded-${rounded}`}
      style={{ width, height }}
    />
  );
}
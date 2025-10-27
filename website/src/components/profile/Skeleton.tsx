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
  const radiusClass = (() => {
    switch (rounded) {
      case 'sm':
        return 'rounded-sm';
      case 'lg':
        return 'rounded-lg';
      case 'full':
        return 'rounded-full';
      case 'none':
        return '';
      case 'md':
      default:
        return 'rounded-md';
    }
  })();

  return (
    <div
      className={`${
        'bg-linear-to-r from-[#2a4444] via-[#3a5555] to-[#2a4444] bg-size-[200%_100%] animate-shimmer'
      } ${radiusClass}`}
      style={{ width, height }}
    />
  );
}
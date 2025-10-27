// components/Profile/LoadingStateExample.tsx
import SkeletonRow from './SkeletonRow';

export default function LoadingStateExample() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-8">Loading State Example</h2>
      
      <div className="space-y-6">
        {/* First skeleton group */}
        <div className="space-y-4">
          <SkeletonRow width="60%" height="24px" />
          <SkeletonRow width="80%" height="20px" />
        </div>

        {/* Second skeleton group */}
        <div className="flex gap-6">
          <SkeletonRow width="200px" height="48px" />
          <SkeletonRow width="100%" height="48px" />
        </div>

        {/* Third skeleton group */}
        <div className="flex gap-6">
          <SkeletonRow width="200px" height="48px" />
          <SkeletonRow width="100%" height="48px" />
        </div>

        {/* Fourth skeleton group */}
        <div className="flex gap-6">
          <SkeletonRow width="200px" height="48px" />
          <SkeletonRow width="100%" height="48px" />
        </div>

        {/* Button skeleton */}
        <div className="flex justify-end mt-8">
          <SkeletonRow width="150px" height="48px" rounded="lg" />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string;
};

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { token, user, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If no token, redirect to signup
    if (!token) {
      router.push('/');
      return;
    }

    // If we have a token but no user and we're not loading, try to fetch user
    if (token && !user && status !== 'loading') {
      // User fetch will happen automatically in Providers component
      return;
    }

    // If user is loaded and we have role requirements, check them
    if (user && requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      // Redirect to dashboard if user doesn't have required role
      router.push('/dashboard');
      return;
    }
  }, [token, user, status, router, requiredRole]);

  // Show loading state while checking auth
  if (!token || (token && !user && status === 'loading')) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-emerald-950 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!token || !user) {
    return null;
  }

  return <>{children}</>;
}
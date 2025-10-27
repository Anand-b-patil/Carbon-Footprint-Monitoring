'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setToken, fetchCurrentUser } from '@/lib/auth/authSlice';
import { loginApi } from '@/lib/auth/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Call backend login API
      const result = await loginApi({ email, password });
      
      // Set token in Redux and localStorage
      dispatch(setToken(result.access_token));
      
      // Fetch current user details
      await dispatch(fetchCurrentUser()).unwrap();
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      // Log detailed error to console for debugging
      console.error('Login failed - Full error details:', {
        error: err,
        message: err.message,
        status: err.status,
        name: err.name,
        stack: err.stack,
        response: err.response,
        request: err.request
      });

      // Check if this is a network error (backend not running)
      if (err.message?.includes('Network Error') || 
          err.message?.includes('ECONNREFUSED') ||
          err.message?.includes('fetch') ||
          err.name === 'ConnectionError' ||
          err.status === 404) {
        console.error('🚨 BACKEND CONNECTION ERROR:');
        console.error('- Backend server is not running on port 5000');
        console.error('- Check if uvicorn is started in carbon-backend directory');
        console.error('- Verify NEXT_PUBLIC_API_URL in .env.local');
        
        setError('🚨 Backend Server Not Running - Please start the backend server first.');
      } else {
        console.error('🚨 LOGIN ERROR:', err.message || 'Unknown error');
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Sign in to your account
        </h2>
        <p className="text-gray-400">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Show login errors */}
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        {/* Contact Support Link */}
        <div className="text-center">
          <span className="text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
          </span>
          <Link
            href="/auth/signup"
            className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
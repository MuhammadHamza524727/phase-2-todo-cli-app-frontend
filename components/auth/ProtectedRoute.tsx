'use client';

import React from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Using window.location to ensure redirect happens outside of React's render cycle
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfo } from '../features/useUserInfo.js';
import LoadingSpinner from './LoadingSpinner.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUserInfo();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
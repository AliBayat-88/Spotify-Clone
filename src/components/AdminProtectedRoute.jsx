// components/AdminProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfo } from '../features/useUserInfo.js';
import LoadingSpinner from './LoadingSpinner.jsx';

function AdminProtectedRoute({ children }) {
  const { user, isAdmin, isLoading } = useUserInfo();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default AdminProtectedRoute;
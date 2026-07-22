import LoadingSpinner from './LoadingSpinner.jsx'
import { useAuth } from '../context/Auth.jsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AuthCallback() {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return <LoadingSpinner />;
}
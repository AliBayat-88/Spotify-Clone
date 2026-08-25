import { useQuery } from '@tanstack/react-query';
import { getUserInfoApi } from '../services/apiUser.js';
import { useAuth } from '../context/Auth.jsx';

export function useUserInfo() {
  const { user, isAuthLoading } = useAuth();
  const userId = user?.id;

  const {
    data: profile,
    isLoading: isProfileLoading,
    error,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserInfoApi(userId),
    enabled: !!userId,
  });

  const isAdmin = profile?.role === 'admin' || Boolean(profile?.isAdmin);

  return {
    user,
    profile,
    isAuthenticated : user?.id,
    isAdmin,
    isLoading: isAuthLoading || isProfileLoading,
    error,
    displayName: profile?.display_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User',
    avatarUrl: profile?.avatar_url || user?.user_metadata?.avatar_url || '/profileImg.png',
    email: user?.email || '',
    role: profile?.role || (profile?.isAdmin ? 'admin' : 'user'),
  };
}
// features/useUserInfo.js
import { useQuery } from '@tanstack/react-query';
import { getUserInfoApi } from '../services/apiUser.js';
import { useAuth } from '../context/Auth.jsx';

export function useUserInfo() {
  const { user } = useAuth();
  const userId = user?.id;

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserInfoApi(userId),
    enabled: !!userId, // فقط زمانی که کاربر لاگین است کوئری اجرا شود
  });

  return {
    profile,
    isLoading,
    error,
    // یکپارچه‌سازی خروجی نهایی کاربر با اولویت دیتابیس و فال‌بک Auth metadata
    displayName: profile?.display_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User',
    avatarUrl: profile?.avatar_url || user?.user_metadata?.avatar_url || '/profileImg.png',
    email: user?.email || '',
  };
}
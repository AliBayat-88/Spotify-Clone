import { useQuery } from '@tanstack/react-query';
import { getDashboardStatsApi } from '../services/apiDashboard.js';

export function useDashboardStats() {
  const {
    data: stats = { users: 0, artists: 0, songs: 0, playlists: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStatsApi,
    staleTime: 1000 * 60 * 2,
  });

  return { stats, isLoading, error };
}
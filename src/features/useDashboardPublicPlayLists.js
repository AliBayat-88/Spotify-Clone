// features/usePublicPlayLists.js
import { useQuery } from '@tanstack/react-query';
import { getDashboardPublicPlaylistsApi } from '../services/apiDashboard.js';

export function useDashboardPublicPlayLists() {
  const { data: publicPlaylists = [], isLoading, error } = useQuery({
    queryKey: ['public-playlists'],
    queryFn: getDashboardPublicPlaylistsApi,
  });

  return { publicPlaylists, isLoading, error };
}
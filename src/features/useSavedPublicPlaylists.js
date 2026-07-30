import { useAuth } from '../context/Auth.jsx'
import { useQuery } from '@tanstack/react-query'
import { getSavedPublicPlaylistsApi } from '../services/apiPlayLists.js'

export function useSavedPublicPlaylists() {
  const { user } = useAuth();

  const { data: savedPublicPlaylists = [], isLoading, error } = useQuery({
    queryKey: ['saved_public_playlists', user?.id],
    queryFn: () => getSavedPublicPlaylistsApi(user?.id),
    enabled: !!user?.id,
  });

  return { savedPublicPlaylists, isLoading, error };
}
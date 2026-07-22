import { useQuery } from '@tanstack/react-query'
import { getPlaylists } from '../services/apiPlayLists.js'
import { useAuth } from '../context/Auth.jsx'

export function usePlaylists() {
  const { user } = useAuth();

  const {
    data: playlists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["playLists", user?.id],
    queryFn: () => getPlaylists(user.id),
    enabled: !!user,
  });

  if (error) throw error;

  return { playlists, isLoading };
}
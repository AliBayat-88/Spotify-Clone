import { useQuery } from '@tanstack/react-query'
import { getPlaylistSongsApi } from '../services/apiPlayLists.js'

export function useGetPlaylistsSongs(playlistId) {
  const { data: playlistData, isLoading, error } = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => getPlaylistSongsApi(playlistId),
    enabled: !!playlistId,
  });

  return { playlistData, isLoading, error };
}
import { useQuery } from '@tanstack/react-query'
import { getPopularSongsApi } from '../services/apiSongs.js'

export function usePopularSongs() {
  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['popular-songs'],
    queryFn: getPopularSongsApi,
  });

  return {songs , isLoading};
}
import { useQuery } from '@tanstack/react-query'
import { getLikedSongsApi } from '../services/apiLikedSongs.js'
import { useAuth } from '../context/Auth.jsx'

export function useLikedSongs() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['likedSongs', user?.id],
    queryFn: () => getLikedSongsApi(user?.id),
    enabled: !!user?.id,
  });
}
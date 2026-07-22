import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/Auth.jsx'
import { getFollowArtists } from '../services/apiArtists.js'

export function useFollowArtist() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['follow_artists', user?.id],
    queryFn: () => getFollowArtists(user?.id),
    enabled: !!user?.id,
  });
}
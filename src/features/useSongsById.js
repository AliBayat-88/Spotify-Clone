import { useQuery } from '@tanstack/react-query'
import { getSongsByArtist } from '../services/apiSongs.js'

export function useSongsByArtist(artistId) {
  const {data:songsByArtist , error , isLoading} = useQuery({
    queryKey: ["artistSongs", artistId],
    queryFn: () => getSongsByArtist(artistId),
    enabled: !!artistId,
  });

  return {songsByArtist, error , isLoading}
}
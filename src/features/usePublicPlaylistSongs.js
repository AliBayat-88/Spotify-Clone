import { useQuery } from '@tanstack/react-query'
import { getPublicPlaylistApi } from '../services/apiPlayLists.js'

export function usePublicPlaylistSongs(publicPlaylistId) {

  const {data : publicPlaylistSongs, error , isLoading} = useQuery({
    queryFn: () => getPublicPlaylistApi(publicPlaylistId),
    queryKey : ['publicPlaylistSongs' ,publicPlaylistId ],
  })

  if(error) throw new Error(error.message)

  return { publicPlaylistSongs , isLoading }
}
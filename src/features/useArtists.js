import { useQuery } from '@tanstack/react-query'
import { getArtists } from '../services/apiArtists.js'

export function useArtists() {
  const {isLoading,data : artists = [] , error} = useQuery({
    queryKey: ['artists'],
    queryFn : getArtists
  })

  return {artists, error , isLoading}
}
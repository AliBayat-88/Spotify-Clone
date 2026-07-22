import { useQuery } from "@tanstack/react-query";
import { getArtist } from '../services/apiArtists.js'


export function useArtist(id) {
  const {isLoading , data : artist , error} = useQuery({
    queryKey:["artist" , id],
    queryFn:() => getArtist(id),
    enabled: !!id
  })

  return { artist, isLoading, error };
}
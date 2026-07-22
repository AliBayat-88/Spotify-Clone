import { useQuery } from "@tanstack/react-query";
import { getSong } from '../services/apiSongs.js'


export function useSong(id) {
  const {isLoading , data : song , error} = useQuery({
    queryKey:["song" , id],
    queryFn:() => getSong(id)
  })

  return { song, isLoading, error };
}

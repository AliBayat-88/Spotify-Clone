import { useQuery } from "@tanstack/react-query";
import { getHomeSections } from '../services/apiSongs.js'


export function useHomeSection() {
  const {isLoading , data , error} = useQuery({
    queryKey:["sections"],
    queryFn:() => getHomeSections()
  })

  return { data, isLoading, error };
}
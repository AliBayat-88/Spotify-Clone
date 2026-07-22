import { useQuery } from "@tanstack/react-query";
import { getSectionDetails } from '../services/apiSongs.js'


export function useSectionDetails(sectionId) {
  const {isLoading , data , error} = useQuery({
    queryKey:["song" , sectionId],
    queryFn:() => getSectionDetails(sectionId)
  })

  return { data, isLoading, error };
}

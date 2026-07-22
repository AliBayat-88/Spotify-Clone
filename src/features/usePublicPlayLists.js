import { useQuery } from '@tanstack/react-query'
import { getPublicPlayListsByCategory } from '../services/apiPlayLists.js'

export function usePublicPlayLists(id) {
  const {data:publicPlayLists , isLoading , error} = useQuery({
    queryKey:["public_playLists" , id],
    queryFn: () => getPublicPlayListsByCategory(id)
  })

  return{publicPlayLists,isLoading, error}
}
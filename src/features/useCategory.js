import { useQuery } from "@tanstack/react-query";
import { getCategory, getSectionCategories } from '../services/apiCategories.js'


export function useCategory(id) {
  const {isLoading , data : category , error} = useQuery({
    queryKey:["category" , id],
    queryFn:() => getCategory(id)
  })

  return { category, isLoading, error };
}

export function useSectionsCategory(id) {
  const {isLoading , data : sections , error} = useQuery({
    queryKey:["sections" , id],
    queryFn:() => getSectionCategories(id)
  })

  return { sections, isLoading, error };
}


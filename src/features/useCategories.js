import { useQuery } from "@tanstack/react-query";
import { getCategories } from '../services/apiCategories.js'


export function useCategories() {
  const {isLoading , data : categories , error} = useQuery({
    queryKey:["categories"],
    queryFn:() => getCategories()
  })

  return { categories, isLoading, error };
}
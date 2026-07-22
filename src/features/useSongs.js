import { useQuery } from '@tanstack/react-query'
import { getSongs } from '../services/apiSongs.js'


export function useSongs() {
  const {isLoading,data : songs = [] , error} = useQuery({
queryKey: ['songs'],
    queryFn : getSongs
  })

return {songs, error , isLoading}

}

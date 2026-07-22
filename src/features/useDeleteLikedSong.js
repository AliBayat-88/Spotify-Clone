import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { deleteLikedSongApi } from '../services/apiLikedSongs.js'

export function useDeleteLikedSong () {
  const queryClient = useQueryClient()
  const {showToast} = useToaster()

  const { isLoading: isDeleting, mutate : deleteLikedSong } = useMutation({
    mutationFn: ({userId , likedSongId}) => deleteLikedSongApi({userId , likedSongId}),
    onSuccess: () => {
      showToast("Successfully deleted the liked song" , "It removed from your liked songs" , "success")
      queryClient.invalidateQueries({ queryKey: ["likedSongs"] });
    }
  });

  return {isDeleting, deleteLikedSong}
}
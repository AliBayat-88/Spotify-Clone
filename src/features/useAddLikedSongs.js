import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { addLikedSongsApi } from '../services/apiLikedSongs.js'

export function useAddLikedSongs() {
  const {showToast} = useToaster()
  const queryClient = useQueryClient()


  const {mutate : addLikedSongs , isLoading} = useMutation({
    mutationFn: ({ userId, likedSongId }) =>
      addLikedSongsApi({ userId, likedSongId }),
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey: ['likedSongs']
      });

      showToast(
        "Added successfully",
        "You can see it in liked songs section",
        "success",
        "link",
        "/library"
      );
    }
  })

  return { addLikedSongs , isLoading }
}
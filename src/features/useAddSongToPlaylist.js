import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { addSongToPlaylistApi } from '../services/apiPlayLists.js'

export function useAddSongToPlaylist() {
  const {showToast} = useToaster()
  const queryClient = useQueryClient()


  const {mutate : addSongToPlaylist , isLoading} = useMutation({
    mutationFn: ({ songId , playlistId }) =>
      addSongToPlaylistApi({ songId , playlistId }),
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey: ['playLists'],
      });

      showToast(
        "Added successfully",
        "You can see the song in your playlist",
        "success",
        "link",
        "/library"
      );
    }
  })

  return { addSongToPlaylist , isLoading }
}
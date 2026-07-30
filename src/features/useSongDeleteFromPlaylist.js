import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSongFromPlaylistApi } from '../services/apiPlayLists.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useSongDeleteFromPlaylist (onSuccessCallback) {
  const queryClient = useQueryClient()
  const {showToast} = useToaster()

  const { isLoading: isDeleting, mutate : deleteSongFromPlaylist } = useMutation({
    mutationFn: ({ playlistId , songId }) => deleteSongFromPlaylistApi({ playlistId , songId }),
    onSuccess: () => {
      onSuccessCallback?.()
      showToast("Successfully deleted" , "The song deleted from this playlist" , "success")
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
    onError: () => showToast("sth went wrong" , "check your internet connection" , "error"),
  });

  return {isDeleting, deleteSongFromPlaylist}
}
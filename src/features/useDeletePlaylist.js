import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePlaylistApi } from '../services/apiPlayLists.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useDeletePlaylist (onSuccessCallback) {
  const queryClient = useQueryClient()
  const {showToast} = useToaster()

  const { isLoading: isDeleting, mutate : deletePlaylist } = useMutation({
    mutationFn: (id) => deletePlaylistApi(id),
    onSuccess: () => {
      onSuccessCallback?.()
      showToast("Successfully deleted playlist" , "You can restrict it from recovery playlist page in profile" , "success" , "link" , "/Account/Recovery-PlayLists")
      queryClient.invalidateQueries({ queryKey: ["playLists"] });
    },
    onError: () => showToast("sth went wrong" , "check your internet connection" , "error"),
  });

  return {isDeleting, deletePlaylist}
}
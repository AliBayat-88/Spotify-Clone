import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { updatePublicPlaylistApi } from '../services/apiDashboard.js'

export function useUpdatePublicPlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster()

  const {mutate : updatePublicPlaylist , error , isPending:isUpdating} = useMutation({
    mutationFn : updatePublicPlaylistApi,
    mutationKey : ["public_playLists"],
    onSuccess : () => {
      showToast('public playlists updated successfully', "" , 'success');

      queryClient.invalidateQueries({queryKey : ["public_playLists"]});
      queryClient.invalidateQueries({queryKey : ["dashboard-stats"]})

      if (onSuccessCallback) onSuccessCallback()
    },
    onError: (err) => {
      showToast('Error updating public playlist', err.message, 'error');
    },
  })

  return {updatePublicPlaylist, error , isUpdating}
}
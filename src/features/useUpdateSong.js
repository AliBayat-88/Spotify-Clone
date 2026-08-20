import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSongApi } from '../services/apiDashboard.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useUpdateSong(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster()

  const {mutate : updateSong , error , isPending:isUpdating} = useMutation({
      mutationFn : updateSongApi,
    mutationKey : ["songs"],
    onSuccess : () => {
      showToast('Song updated successfully', "" , 'success');

      queryClient.invalidateQueries({queryKey : ["songs"]});
      queryClient.invalidateQueries({queryKey : ["dashboard-stats"]})

      if (onSuccessCallback) onSuccessCallback()
  },
    onError: (err) => {
      showToast('Error updating song', err.message, 'error');
    },
  })

  return {updateSong, error , isUpdating}
}
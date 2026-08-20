import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateArtistApi } from '../services/apiDashboard.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useUpdateArtist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster()

  const {mutate : updateArtist , error , isPending:isUpdating} = useMutation({
    mutationFn : updateArtistApi,
    mutationKey : ["artists"],
    onSuccess : () => {
      showToast('artist updated successfully', "" , 'success');

      queryClient.invalidateQueries({queryKey : ["artists"]});
      queryClient.invalidateQueries({queryKey : ["dashboard-stats"]})

      if (onSuccessCallback) onSuccessCallback()
    },
    onError: (err) => {
      showToast('Error updating song', err.message, 'error');
    },
  })

  return {updateArtist, error , isUpdating}
}
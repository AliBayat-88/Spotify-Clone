import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteArtistApi } from '../services/apiDashboard.js'
import { useToaster } from '../context/ToastContext.jsx';

export function useDeleteArtist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: deleteArtist, isPending: isDeleting } = useMutation({
    mutationFn: deleteArtistApi,
    onSuccess: () => {
      showToast('artist deleted successfully', '', 'success');

      queryClient.invalidateQueries({ queryKey: ['artists'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error deleting artist', err.message, 'error');
    },
  });

  return { deleteArtist, isDeleting };
}
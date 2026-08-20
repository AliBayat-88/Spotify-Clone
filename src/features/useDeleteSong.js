import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSongApi } from '../services/apiDashboard.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useDeleteSong(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: deleteSong, isPending: isDeleting } = useMutation({
    mutationFn: deleteSongApi,
    onSuccess: () => {
      showToast('Song deleted successfully', '', 'success');

      queryClient.invalidateQueries({ queryKey: ['songs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error deleting song', err.message, 'error');
    },
  });

  return { deleteSong, isDeleting };
}
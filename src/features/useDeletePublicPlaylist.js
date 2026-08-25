import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  deletePublicPlaylistApi } from '../services/apiDashboard.js'
import { useToaster } from '../context/ToastContext.jsx';

export function useDeletePublicPlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: deletePublicPlaylist, isPending: isDeleting } = useMutation({
    mutationFn: deletePublicPlaylistApi,
    onSuccess: () => {
      showToast('the public playlists deleted successfully', '', 'success');

      queryClient.invalidateQueries({ queryKey: ['public-playlists'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error deleting public-playlists', err.message, 'error');
    },
  });

  return { deletePublicPlaylist, isDeleting };
}
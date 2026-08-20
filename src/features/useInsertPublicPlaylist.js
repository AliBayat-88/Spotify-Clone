// features/useInsertPublicPlaylist.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertPublicPlaylistApi } from '../services/apiDashboard.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useInsertPublicPlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: insertPublicPlaylist, isPending } = useMutation({
    mutationFn: insertPublicPlaylistApi,
    onSuccess: () => {
      showToast('Playlist created successfully!', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['public-playlists'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error creating playlist', err.message, 'error');
    },
  });

  return { insertPublicPlaylist, isPending };
}
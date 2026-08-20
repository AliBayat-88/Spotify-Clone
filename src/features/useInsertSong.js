import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx';
import { insertSongApi } from '../services/apiDashboard.js'

export function useInsertSong(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: insertSong, isPending } = useMutation({
    mutationFn: insertSongApi,
    onSuccess: () => {
      showToast('Song added successfully!', 'The track is now live on the platform.', 'success');

      queryClient.invalidateQueries({ queryKey: ['songs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error creating song', err.message, 'error');
    },
  });

  return { insertSong, isPending };
}
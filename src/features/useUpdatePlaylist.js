import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlaylistApi } from '../services/apiPlayLists.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useUpdatePlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: updatePlaylist, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, obj, image }) => updatePlaylistApi(id, obj, image),
    onSuccess: (data) => {
      showToast("Playlist updated", "Your playlist details have been updated", "success");

      queryClient.invalidateQueries({ queryKey: ['playLists'] });

      queryClient.invalidateQueries({ queryKey: ['playlist', String(data.id)] });

      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast("Error updating playlist", err.message, "error");
    }
  });

  return { updatePlaylist, isUpdating };
}
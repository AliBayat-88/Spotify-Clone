import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx';
import { insertArtistApi } from '../services/apiDashboard.js'

export function useInsertArtist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: insertArtist, isPending:isInserting } = useMutation({
    mutationFn: insertArtistApi,
    onSuccess: () => {
      showToast('Artist added successfully!', 'The artist is now live on the platform.', 'success');

      queryClient.invalidateQueries({ queryKey: ['artists'] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error creating artist', err.message, 'error');
    },
  });

  return { insertArtist, isPending:isInserting };
}
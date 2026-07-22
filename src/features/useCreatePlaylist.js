import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlaylistApi } from '../services/apiPlayLists.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useCreatePlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: createPlaylist, isLoading: isCreating } = useMutation({
    mutationFn: ({ name, userId }) => createPlaylistApi(name , userId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["playLists"],
      });
      onSuccessCallback?.();
      showToast("Created successfully", `You can visit ${variables} playlist in your library`, "success", "link" , "/library");
    },
    onError: () => {
      showToast("Error", "Error creating playlist", "error");
    }
  });

  return { createPlaylist, isCreating };
}
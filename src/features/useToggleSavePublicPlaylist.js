import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/Auth.jsx'
import { savePublicPlaylistApi, unsavePublicPlaylistApi } from '../services/apiPlayLists.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useToggleSavePublicPlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { showToast } = useToaster()

  const { mutate: savePublicPlaylist, isLoading: isSaving } = useMutation({
    mutationFn: ({ user_id, public_playlist_id }) => savePublicPlaylistApi({ user_id, public_playlist_id }),
    onSuccess: () => {
      showToast("Added to your library", "check it out in your library", "success", "link", "/library")
      queryClient.invalidateQueries({ queryKey: ['saved_public_playlists', user?.id] });
    },
  });

  const { mutate: unsavePublicPlaylist, isLoading: isUnsaving } = useMutation({
    mutationFn: ({ user_id, public_playlist_id }) => unsavePublicPlaylistApi({ user_id, public_playlist_id }),
    onSuccess: () => {
      onSuccessCallback?.()
      showToast("deleted successfully" ,  "the selected playlist has been removed", "success")
      queryClient.invalidateQueries({ queryKey: ['saved_public_playlists', user?.id] });
    },
  });

  return {
    savePublicPlaylist,
    unsavePublicPlaylist,
    isSaving,
    isUnsaving, // 🟢 به خروجی اضافه شد
    isPending: isSaving || isUnsaving
  };
}
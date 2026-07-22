import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePlaylistApi } from '../services/apiPlayLists.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useUpdatePlaylist(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { isLoading: isUpdating, mutate: updatePlaylist } = useMutation({
    // 🟢 دریافت فایل عکس در کنار بقیه مشخصات
    mutationFn: ({ id, obj, image }) => updatePlaylistApi(id, obj, image),

    onSuccess: (_, variables) => {
      onSuccessCallback?.()
      queryClient.invalidateQueries({ queryKey: ["playLists"] });
      showToast("Updated successfully", `The "${variables.obj.name}" playlist has changed`, "success");
    },
    onError: (err) => {
      showToast("Error", err.message || "Error updating playlist", "error");
    }
  });

  return { isUpdating, updatePlaylist };
}
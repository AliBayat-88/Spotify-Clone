import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../context/ToastContext.jsx";
import { restorePlaylistApi } from '../services/apiPlayLists.js'

export function useRestorePlaylist() {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: restorePlaylist, isPending: isRestoring } = useMutation({
    mutationFn: restorePlaylistApi,
    onSuccess: () => {
      showToast("Playlist restored successfully!", "", "success");

      // اینولید کردن کش لیست حذف‌شده‌ها و پلی‌لیست‌های اصلی کاربر
      queryClient.invalidateQueries({ queryKey: ["deleted-playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (err) => {
      showToast("Failed to restore playlist", err.message, "error");
    },
  });

  return { restorePlaylist, isRestoring };
}
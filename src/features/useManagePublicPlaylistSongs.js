import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx';
import { addSongToPublicPlaylistApi, removeSongFromPublicPlaylistApi } from '../services/apiDashboard.js'

export function useManagePublicPlaylistSongs(playlistId) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: addSong, isPending: isAdding } = useMutation({
    mutationFn: addSongToPublicPlaylistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicPlaylist', String(playlistId)] });
      queryClient.invalidateQueries({ queryKey: ['publicPlaylistSongs', String(playlistId)] });
      showToast('Track added to playlist', '', 'success');
    },
    onError: (err) => showToast(err.message, '', 'error'),
  });

  const { mutate: removeSong, isPending: isRemoving } = useMutation({
    mutationFn: removeSongFromPublicPlaylistApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicPlaylist', String(playlistId)] });
      queryClient.invalidateQueries({ queryKey: ['publicPlaylistSongs', String(playlistId)] });
      showToast('Track removed from playlist', '', 'success');
    },
    onError: (err) => showToast(err.message, '', 'error'),
  });

  return { addSong, isAdding, removeSong, isRemoving };
}
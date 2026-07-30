import { useAuth } from '../context/Auth.jsx';
import { useToaster } from '../context/ToastContext.jsx';
import { useAddLikedSongs } from '../features/useAddLikedSongs.js';
import { useLikedSongs } from '../features/useLikedSongs.js';
import { useDeleteLikedSong } from '../features/useDeleteLikedSong.js';

export function useToggleLikeSong(song) {
  const { user } = useAuth();
  const { showToast } = useToaster();
  const { data: likedSongs = [] } = useLikedSongs();
  const { addLikedSongs, isLoading: isAdding } = useAddLikedSongs();
  const { deleteLikedSong, isLoading: isDeleting } = useDeleteLikedSong();

  const songId = song?.id;

  const isLiked = likedSongs.some((item) => {
    if (typeof item === 'number' || typeof item === 'string') {
      return Number(item) === Number(songId);
    }
    return Number(item?.id || item?.song_id) === Number(songId);
  });

  function toggleLike() {
    if (!user) {
      return showToast(
        "You need to login first",
        "Please login to use this feature",
        "error",
        "link",
        "/login"
      );
    }

    if (!songId) return;

    if (isLiked) {
      deleteLikedSong({ userId: user.id, likedSongId: songId });
    } else {
      addLikedSongs({ userId: user.id, likedSongId: songId });
    }
  }

  return {
    isLiked,
    toggleLike,
    isLoading: isAdding || isDeleting,
  };
}
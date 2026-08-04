import { useAuth } from '../context/Auth.jsx'
import { useToaster } from '../context/ToastContext.jsx'
import { useFollowArtist } from '../features/useFollowArtist.js'
import { useAddFollowArtist } from '../features/useAddFollowArtist.js'
import { useDeleteFollowArtist } from '../features/useDeleteFollowArtist.js'

export function useArtistFollow(artistId) {
  const { user } = useAuth()
  const { showToast } = useToaster()
  const { data: followedArtists = [], isLoading: isLoadingFollows } = useFollowArtist()
  const { addFollowArtist, isPending: isAdding } = useAddFollowArtist()
  const { deleteFollowArtist, isPending: isDeleting } = useDeleteFollowArtist()

  const isFollowed = followedArtists.some((item) => {
    const followedArtistId = item?.artists?.id || item?.artist_id;
    return Number(followedArtistId) === Number(artistId);
  });

  function handleFollowToggle() {
    if (!user) {
      return showToast(
        "You need to login first",
        "Login to use this feature",
        "error",
        "link",
        "/login"
      )
    }

    if (!artistId) return;

    if (isFollowed) {
      deleteFollowArtist({ userId: user.id, artistId })
    } else {
      addFollowArtist({ userId: user.id, artistId })
    }
  }

  return {
    isFollowed,
    handleFollowToggle,
    isPending: isAdding || isDeleting,
    isLoadingFollows
  }
}
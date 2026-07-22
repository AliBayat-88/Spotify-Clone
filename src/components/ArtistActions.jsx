import PlayButton from './PlayButton.jsx'
import ActionBtn from './ActionBtn.jsx'
import ArtistDropDown from './ArtistDropDown.jsx'
import { useAuth } from '../context/Auth.jsx'
import { useToaster } from '../context/ToastContext.jsx'
import { useFollowArtist } from '../features/useFollowArtist.js'
import { useAddFollowArtist } from '../features/useAddFollowArtist.js'
import { useDeleteFollowArtist } from '../features/useDeleteFollowArtist.js'

function ArtistActions({ artistId }) {
  const { user } = useAuth()
  const { showToast } = useToaster()
  const { data: followedArtists = [] } = useFollowArtist()
  const { addFollowArtist } = useAddFollowArtist()
  const { deleteFollowArtist } = useDeleteFollowArtist()

  // سنک کردن وضعیت فالو با استفاده از متد some
  const isArtistsFollowed = followedArtists.some(
    (item) => String(item.artist_id) === String(artistId)
  )

  // تابع مشترک برای هندل کردن فالو/آن‌فالو
  function handleFollowToggle() {
    if (!user) {
      return showToast(
        "ابتدا باید وارد شوید",
        "برای استفاده از این قابلیت لطفا لاگین کنید",
        "error",
        "link",
        "/login"
      )
    }

    if (isArtistsFollowed) {
      deleteFollowArtist({ userId: user.id, artistId })
    } else {
      addFollowArtist({ userId: user.id, artistId })
    }
  }

  return (
    <div className="flex gap-x-4 items-center child:transition-all">
      <button className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 inline-flex justify-center items-center">
        <PlayButton className="w-8 h-8"/>
      </button>

      {/* دکمه پویا: تغییر استایل بر اساس وضعیت فالو */}
      <ActionBtn
        onClick={handleFollowToggle}
        title={isArtistsFollowed ? "Following" : "Follow"}
        className={
          isArtistsFollowed
            ? "bg-white text-black px-5 py-1.5 border-2 border-white"
            : "bg-transparent text-white px-5 py-1.5 border-2 border-white hover:bg-white/10"
        }
      />

      {/* پاس دادن وضعیت و تابع به دراپ‌داون برای همگام‌سازی */}
      <ArtistDropDown
        artistId={artistId}
        isArtistsFollowed={isArtistsFollowed}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  )
}

export default ArtistActions
import PlayButton from './PlayButton.jsx'
import ActionBtn from './ActionBtn.jsx'
import ArtistDropDown from './ArtistDropDown.jsx'
import { useArtistFollow } from '../hooks/useArtistFollow.js'

function ArtistActions({ artistId }) {
  const {isFollowed , handleFollowToggle} = useArtistFollow(artistId)


  return (
    <div className="flex gap-x-4 items-center child:transition-all">
      <button className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 inline-flex justify-center items-center">
        <PlayButton className="w-8 h-8"/>
      </button>

      {/* دکمه پویا: تغییر استایل بر اساس وضعیت فالو */}
      <ActionBtn
        onClick={handleFollowToggle}
        title={isFollowed ? "Following" : "Follow"}
        className={
          isFollowed
            ? "bg-white text-black px-5 py-1.5 border-2 border-white"
            : "bg-transparent text-white px-5 py-1.5 border-2 border-white hover:bg-white/10"
        }
      />

      {/* پاس دادن وضعیت و تابع به دراپ‌داون برای همگام‌سازی */}
      <ArtistDropDown
        artistId={artistId}
        isArtistsFollowed={isFollowed}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  )
}

export default ArtistActions
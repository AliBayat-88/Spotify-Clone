import PlayButton from './PlayButton.jsx';
import PauseBtn from './PauseBtn.jsx';
import ActionBtn from './ActionBtn.jsx';
import ArtistDropDown from './ArtistDropDown.jsx';
import { useArtistFollow } from '../hooks/useArtistFollow.js';
import { usePlayer } from '../context/PlayerContext.jsx';

function ArtistActions({ artistId, songs = [], onOpenBio }) {
  const { isFollowed, handleFollowToggle } = useArtistFollow(artistId);
  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer();

  const isCurrentArtistPlaying = songs.some(
    (s) => Number(s?.id) === Number(currentSong?.id)
  );

  function handlePlay() {
    if (!songs || songs.length === 0) return;

    if (isCurrentArtistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  }

  return (
    <div className="flex gap-x-3 sm:gap-x-4 items-center child:transition-all">
      {/* 🟢 دکمه اصلی پخش / پاز خواننده */}
      <button
        onClick={handlePlay}
        className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-transform inline-flex justify-center items-center shadow-lg cursor-pointer"
      >
        {isCurrentArtistPlaying && isPlaying ? (
          <PauseBtn className="w-8 h-8 text-black" color="#000000" />
        ) : (
          <PlayButton className="w-8 h-8 text-black" color="#000000" />
        )}
      </button>

      {/* دکمه Follow / Following */}
      <ActionBtn
        onClick={handleFollowToggle}
        title={isFollowed ? "Following" : "Follow"}
        className={
          isFollowed
            ? "bg-transparent text-white px-5 py-1.5 border border-white/40 hover:border-white text-xs sm:text-sm"
            : "bg-white text-black px-5 py-1.5 hover:bg-gray-200 text-xs sm:text-sm"
        }
      />

      {/* دکمه About */}
      <ActionBtn
        onClick={onOpenBio}
        title="About"
        className="bg-transparent text-white px-5 py-1.5 border border-white/40 hover:border-white hover:bg-white/10 text-xs sm:text-sm"
      />

      {/* دراپ‌داون گزینه‌ها */}
      <ArtistDropDown
        artistId={artistId}
        isArtistsFollowed={isFollowed}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  );
}

export default ArtistActions;
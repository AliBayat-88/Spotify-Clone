import BackWardBtn from './BackWardBtn.jsx'
import PauseBtn from './PauseBtn.jsx'
import ForwardBtn from './ForwardBtn.jsx'
import AudioPlay from './AudioPlay.jsx'
import RangeSlider from './RangeSlider.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import PlayBtn from './PlayBtn.jsx'
import { useArtist } from '../features/useArtist.js'
import { useToggleLikeSong } from '../hooks/useToggleLikedSong.js'
import AnimatedCheckIcon from './icons/AnimatedCheckIcon.jsx'
import PlusIcon from './icons/PlusIcon.jsx'

function PlayerBar() {
  const { setIsExpanded, isPlaying, togglePlay, currentSong, playNext, playPrevious } = usePlayer();
  const { isLiked, toggleLike } = useToggleLikeSong(currentSong);

  const artistId = currentSong?.artist_id || currentSong?.artists?.id;
  const { artist } = useArtist(artistId);

  const artistName = artist?.name || currentSong?.artists?.name || "Unknown Artist";

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className={`bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 fixed ${
        currentSong ? "translate-y-0 opacity-100 flex" : 'translate-y-20 opacity-0 hidden'
      } bottom-0 right-0 left-0 w-full h-20 p-4 text-white items-center justify-between z-50 cursor-pointer md:cursor-default overflow-hidden transition-all duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]`}
    >
      {isPlaying && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1ed760]/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#1ed760] to-transparent animate-border-beam opacity-90" />
          </div>
        </>
      )}

      {/* بخش سمت چپ */}
      <div className="w-60 flex items-center gap-x-2 lg:gap-x-3">
        <div>
          <img loading="lazy" src={currentSong?.cover_url} className="w-10 lg:w-12 h-10 lg:h-12 rounded-sm object-cover" alt="" />
        </div>
        <div className="flex flex-col gap-y-0.5 text-sm min-w-0 pr-2">
          <span className="font-semibold truncate">{currentSong?.name}</span>
          <span className="text-white/60 text-xs truncate">{artistName}</span>
        </div>
        <div onClick={toggleLike} className="hidden sm:block shrink-0">
          {isLiked ? (
            <AnimatedCheckIcon/>
          ) : (
            <button
              type="button"
              className="hover:border-gray-400 border-white border-[1px] sm:border-[2px] inline-flex p-0.5 rounded-full bg-transparent text-gray-400 hover:text-white">
              <PlusIcon className="w-6 sm:w-4 h-6 sm:h-4"/>
            </button>
          )}
        </div>
      </div>

      {/* بخش وسط */}
      <div className="flex items-center flex-col">
        <div className="flex items-center gap-x-3.5 lg:gap-x-5 child:hidden md:child:block">
          <BackWardBtn
            onClick={(e) => {
              e.stopPropagation();
              playPrevious();
            }}
            className="fill-[#999999] hover:fill-white transition-colors w-7 h-7 cursor-pointer"
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-1 rounded-full bg-white hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-md"
          >
            {isPlaying ? (
              <PauseBtn className="fill-black w-7 h-7" />
            ) : (
              <PlayBtn className="fill-black w-7 h-7" />
            )}
          </div>
          <ForwardBtn
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
            className="fill-[#999999] hover:fill-white transition-colors w-7 h-7 cursor-pointer"
          />
        </div>
        <div className="hidden md:block">
          <AudioPlay />
        </div>
      </div>

      {/* بخش سمت راست */}
      <RangeSlider />
    </div>
  );
}

export default PlayerBar;